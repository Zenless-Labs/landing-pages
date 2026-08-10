import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

test('homepage contact calls to action open the dedicated contact page', async () => {
  const home = await readFile(new URL('app/page.tsx', root), 'utf8');
  assert.equal((home.match(/href="\/contact"/g) ?? []).length, 3);
  assert.doesNotMatch(home, /href="#contact"/);
});

test('contact page collects project details with accessible labels', async () => {
  const page = await readFile(new URL('app/contact/contact-form.tsx', root), 'utf8');
  for (const field of ['name', 'email', 'company', 'message']) {
    assert.match(page, new RegExp(`htmlFor="${field}"`));
    assert.match(page, new RegExp(`(?:id|name)="${field}"`));
  }
  assert.match(page, /aria-live="polite"/);
  assert.match(page, /aria-atomic="true"/);
  assert.match(page, /fetch\('\/api\/contact'/);
  assert.match(page, /statusRef/);
  assert.match(page, /parsed && typeof parsed === 'object'/);
});

test('contact API uses a fixed recipient and validates untrusted submissions', async () => {
  const route = await readFile(new URL('app/api/contact/route.ts', root), 'utf8');
  assert.match(route, /process\.env\.RESEND_API_KEY/);
  assert.match(route, /https:\/\/api\.resend\.com\/emails/);
  assert.match(route, /const RECIPIENT = 'hey@zenlesslabs\.com'/);
  assert.match(route, /to:\s*\[RECIPIENT\]/);
  assert.match(route, /website/); // honeypot
  assert.match(route, /escapeHtml/);
  assert.match(route, /reply_to/);
  assert.match(route, /MAX_BODY_BYTES/);
  assert.match(route, /content-type/);
  assert.match(route, /request\.body\.getReader/);
  assert.match(route, /request\.headers\.get\('origin'\)/);
  assert.match(route, /AbortSignal\.timeout/);
  assert.match(route, /resendResponse = await fetch[\s\S]*catch/);
  assert.doesNotMatch(route, /to:\s*\[?(?:body|data)\./);
});
