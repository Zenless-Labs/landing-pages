'use client';

import { FormEvent, useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import { MAX_ATTACHMENT_BYTES, MAX_ATTACHMENTS } from '@/lib/attachment-limits';
import { Arrow } from '../studio-components';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm({
  initialService = 'Help me choose',
}: {
  initialService?: string;
}) {
  const [state, setState] = useState<FormState>('idle');
  const [projectRoute, setProjectRoute] = useState('Design + make');
  const [service, setService] = useState(initialService);
  const [feedback, setFeedback] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const uploaded = useRef(new Map<File, string>());
  const startedAt = useRef(Date.now());
  const statusRef = useRef<HTMLParagraphElement>(null);

  function focusStatus() {
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('submitting');
    setFeedback('');

    const form = event.currentTarget;
    const fields = new FormData(form);
    const reference = String(fields.get('reference') || '').trim();
    const data = {
      name: fields.get('name'),
      email: fields.get('email'),
      company: fields.get('company'),
      website: fields.get('website'),
      message: `Process: ${service}\nProject: ${projectRoute}\n\n${fields.get('message')}${reference ? `\n\nReference / model: ${reference}` : ''}`,
    };

    try {
      const attachments: string[] = [];
      for (const file of files) {
        if (file.size > MAX_ATTACHMENT_BYTES) throw new Error(`${file.name} exceeds 30 MB.`);
        let pathname = uploaded.current.get(file);
        if (!pathname) {
          const filename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-160) || 'attachment';
          const blob = await upload(`inquiries/${crypto.randomUUID()}/${filename}`, file, {
            access: 'private',
            handleUploadUrl: '/api/contact/upload',
            multipart: file.size > 5 * 1024 * 1024,
            clientPayload: JSON.stringify({ startedAt: startedAt.current, website: data.website }),
            onUploadProgress: ({ percentage }) => setFeedback(`Uploading ${file.name} · ${Math.round(percentage)}%`),
          });
          pathname = blob.pathname;
          uploaded.current.set(file, pathname);
        }
        attachments.push(pathname);
      }
      setFeedback('Sending your brief…');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, attachments, startedAt: startedAt.current }),
      });
      let result: { error?: string } = {};
      try {
        const parsed: unknown = await response.json();
        if (
          parsed &&
          typeof parsed === 'object' &&
          'error' in parsed &&
          typeof parsed.error === 'string'
        ) {
          result = { error: parsed.error };
        }
      } catch {
        // Proxies and framework errors are not guaranteed to return JSON.
      }

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your message.');
      }

      form.reset();
      setFiles([]);
      uploaded.current.clear();
      setProjectRoute('Design + make');
      setService(initialService);
      startedAt.current = Date.now();
      setState('success');
      setFeedback(
        'Your idea is in good hands. Your brief has been sent to the studio, and we’ll reply by email.',
      );
      focusStatus();
    } catch (error) {
      setState('error');
      setFeedback(
        error instanceof Error ? error.message : 'Unable to send your message.',
      );
      focusStatus();
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="form-heading">
        <h2>Your project brief</h2>
        <span className="micro">LET’S START HERE ↗</span>
      </div>
      <fieldset className="project-route" disabled={state === 'submitting'}>
        <legend>Where are we starting?</legend>
        <div className="route-options">
          {['Design + make', 'I have a design'].map((route) => (
            <button
              type="button"
              key={route}
              aria-pressed={projectRoute === route}
              onClick={() => setProjectRoute(route)}
            >
              <i aria-hidden="true" />
              {route}
              <span>
                {route === 'Design + make'
                  ? 'An idea, a sketch, a possibility.'
                  : 'A file ready for the next step.'}
              </span>
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="service-choice" disabled={state === 'submitting'}>
        <legend>What process do you have in mind?</legend>
        <div className="service-options">
          {[
            '3D printing',
            'Laser cutting & engraving',
            'UV printing',
            'CNC crafts',
            'Help me choose',
          ].map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={service === item}
              onClick={() => setService(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Alex Morgan"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="alex@yourteam.com"
            autoComplete="email"
            maxLength={254}
            required
          />
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="company">
            Company or team <span>Optional</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Who are you making this for?"
            autoComplete="organization"
            maxLength={120}
          />
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="message">Tell us what you’re imagining</label>
          <textarea
            id="message"
            name="message"
            rows={7}
            minLength={20}
            maxLength={4500}
            required
            aria-describedby="message-hint"
            placeholder="What would you love to make? Tell us about the idea, your team, or the occasion.

If you know them, include quantity, event date, delivery location, budget, and any color or material preferences."
          />
          <p id="message-hint" className="field-hint">
            A few sentences are plenty. You don’t need to have it all figured
            out.
          </p>
        </div>
        <div className="form-field form-field-wide attachment-field">
          <label htmlFor="attachments">Attach your files <span>Optional</span></label>
          <p id="attachments-hint" className="field-hint">Models, artwork, photos, or a project brief. Up to 5 files, 30 MB each. Uploads are automatically deleted after 14 days.</p>
          <input id="attachments" type="file" multiple disabled={state === 'submitting'}
            aria-describedby="attachments-hint"
            onChange={(event) => {
              const selected = Array.from(event.target.files || []);
              event.target.value = '';
              if (files.length + selected.length > MAX_ATTACHMENTS || selected.some((file) => file.size > MAX_ATTACHMENT_BYTES)) {
                setState('error');
                setFeedback('Choose up to 5 files, each 30 MB or smaller.');
                focusStatus();
                return;
              }
              setFiles((current) => [...current, ...selected]);
              setFeedback('');
              setState('idle');
            }} />
          {files.length > 0 && <ul className="attachment-list">
            {files.map((file, index) => <li key={`${file.name}-${index}`}>
              <span>{file.name} <small>{(file.size / 1024 / 1024).toFixed(1)} MB</small></span>
              <button type="button" disabled={state === 'submitting'} aria-label={`Remove ${file.name}`}
                onClick={() => setFiles((current) => current.filter((_, i) => i !== index))}>Remove</button>
            </li>)}
          </ul>}
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="reference">
            Artwork, reference, or model link <span>Optional</span>
          </label>
          <input
            id="reference"
            name="reference"
            type="url"
            maxLength={350}
            placeholder="https://…"
            aria-describedby="reference-hint"
          />
          <p id="reference-hint" className="field-hint">
            A shared folder, moodboard, artwork, or model. Please make sure we
            can view it.
          </p>
        </div>
      </div>

      <div className="form-submit-row">
        <p
          ref={statusRef}
          className={`form-status ${state}`}
          role={state === 'error' ? 'alert' : 'status'}
          aria-live="polite"
          aria-atomic="true"
          tabIndex={-1}
        >
          {feedback}
        </p>
        <button
          className="button button-dark"
          type="submit"
          disabled={state === 'submitting'}
        >
          {state === 'submitting'
            ? 'Sending your brief…'
            : 'Let’s make it happen'}{' '}
          <Arrow diagonal />
        </button>
      </div>
      <p className="form-note">
        An idea, not a commitment. Prefer email?{' '}
        <a href="mailto:hey@zenlesslabs.com">Say hello directly.</a>
      </p>
    </form>
  );
}
