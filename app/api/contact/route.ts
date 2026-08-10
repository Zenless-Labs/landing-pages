import { NextResponse } from 'next/server';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const RECIPIENT = 'hey@zenlesslabs.com';
const SENDER = 'Zenless Labs Website <website@zenlesslabs.com>';
const MAX_BODY_BYTES = 16_384;
const RESEND_TIMEOUT_MS = 8_000;
const ALLOWED_FIELDS = new Set(['name', 'email', 'company', 'message', 'website', 'startedAt']);

class PayloadTooLargeError extends Error {}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return entities[character];
  });
}

function stringField(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

async function readLimitedJson(request: Request): Promise<Record<string, unknown>> {
  const contentLength = request.headers.get('content-length');
  if (contentLength) {
    const declaredBytes = Number(contentLength);
    if (!Number.isFinite(declaredBytes) || declaredBytes < 0 || declaredBytes > MAX_BODY_BYTES) {
      throw new PayloadTooLargeError();
    }
  }

  if (!request.body) {
    throw new SyntaxError('Missing request body');
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new PayloadTooLargeError();
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new SyntaxError('Expected a JSON object');
  }

  const body = parsed as Record<string, unknown>;
  if (Object.keys(body).some((key) => !ALLOWED_FIELDS.has(key))) {
    throw new SyntaxError('Unexpected field');
  }
  return body;
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return NextResponse.json({ error: 'Content-Type must be application/json.' }, { status: 415 });
  }

  const origin = request.headers.get('origin');
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') || new URL(request.url).protocol.slice(0, -1);
  const publicOrigin = host ? `${protocol}://${host}` : new URL(request.url).origin;
  if (!origin || origin !== publicOrigin) {
    return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await readLimitedJson(request);
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return NextResponse.json({ error: 'Request is too large.' }, { status: 413 });
    }
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = stringField(body.name);
  const email = stringField(body.email).toLowerCase();
  const company = stringField(body.company);
  const message = stringField(body.message);
  const website = stringField(body.website);
  const startedAt = Number(body.startedAt);

  // Quietly accept honeypot submissions so bots receive no useful signal.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const headerControls = /[\u0000-\u001f\u007f]/;
  const submissionAge = Date.now() - startedAt;
  const invalidTiming = !Number.isFinite(startedAt) || submissionAge < 1500 || submissionAge > 86_400_000;

  if (
    name.length < 2 ||
    name.length > 100 ||
    headerControls.test(name) ||
    !emailPattern.test(email) ||
    email.length > 254 ||
    company.length > 120 ||
    headerControls.test(company) ||
    message.length < 20 ||
    message.length > 5000 ||
    message.includes('\u0000') ||
    invalidTiming
  ) {
    return NextResponse.json(
      { error: 'Please check your details and try again.' },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'The contact service is temporarily unavailable.' },
      { status: 503 },
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company || 'Not provided');
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');
  const subjectName = name.replace(/[\r\n]+/g, ' ').slice(0, 80);

  let resendResponse: Response;
  try {
    resendResponse = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
      body: JSON.stringify({
        from: SENDER,
        to: [RECIPIENT],
        reply_to: email,
        subject: `New Zenless Labs inquiry from ${subjectName}`,
        html: `
          <h2>New website inquiry</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Company:</strong> ${safeCompany}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
        text: `New website inquiry\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\n\n${message}`,
      }),
    });
  } catch {
    return NextResponse.json(
      { error: 'We could not send your message. Please try again shortly.' },
      { status: 502 },
    );
  }

  if (!resendResponse.ok) {
    return NextResponse.json(
      { error: 'We could not send your message. Please try again shortly.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
