'use client';

import { FormEvent, useRef, useState } from 'react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [feedback, setFeedback] = useState('');
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
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, startedAt: startedAt.current }),
      });
      let result: { error?: string } = {};
      try {
        const parsed: unknown = await response.json();
        if (
          parsed && typeof parsed === 'object' &&
          'error' in parsed && typeof parsed.error === 'string'
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
      startedAt.current = Date.now();
      setState('success');
      setFeedback('Message sent. We’ll be in touch soon.');
      focusStatus();
    } catch (error) {
      setState('error');
      setFeedback(error instanceof Error ? error.message : 'Unable to send your message.');
      focusStatus();
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" minLength={2} maxLength={100} required />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={254} required />
        </div>

        <div className="form-field form-field-wide">
          <label htmlFor="company">Company <span>Optional</span></label>
          <input id="company" name="company" type="text" autoComplete="organization" maxLength={120} />
        </div>

        <div className="form-field form-field-wide">
          <label htmlFor="message">What are you building?</label>
          <textarea id="message" name="message" rows={8} minLength={20} maxLength={5000} required />
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
        <button type="submit" disabled={state === 'submitting'}>
          {state === 'submitting' ? 'Sending…' : 'Send inquiry'} <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
