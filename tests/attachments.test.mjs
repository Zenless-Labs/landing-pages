import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../app/api/contact/route.ts', import.meta.url), 'utf8');
function route({ size = 12 } = {}) {
  const emails = [];
  const exports = {};
  vm.runInNewContext(ts.transpile(source, { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }), {
    exports, Request, Response, URL, Uint8Array, TextDecoder, AbortSignal,
    process: { env: { RESEND_API_KEY: 'test-only' } },
    require(name) {
      if (name === 'next/server') return { NextResponse: Response };
      if (name === '@vercel/blob') return { head: async () => ({ size }) };
      if (name.endsWith('attachment-links')) return { signAttachment: () => 'signed-link' };
      if (name.endsWith('attachment-limits')) return { MAX_ATTACHMENT_BYTES: 30 * 1024 * 1024, MAX_ATTACHMENTS: 5, ATTACHMENT_PATH: /^inquiries\/[0-9a-f-]{36}\/[a-zA-Z0-9._-]{1,160}$/ };
      throw new Error(name);
    },
    fetch: async (_, options) => { emails.push(JSON.parse(options.body)); return Response.json({ id: 'test' }); },
  });
  return { post: exports.POST, emails };
}
const path = 'inquiries/12345678-1234-1234-1234-123456789012/model.stl';
function request(attachments) {
  return new Request('https://www.zenlesslabs.com/api/contact', {
    method: 'POST', headers: { origin: 'https://www.zenlesslabs.com', 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Test User', email: 'test@example.com', company: '', message: 'A detailed project description for testing.', website: '', startedAt: Date.now() - 5000, attachments }),
  });
}
test('inquiry email includes private download links and retention notice', async () => {
  const { post, emails } = route();
  assert.equal((await post(request([path]))).status, 200);
  assert.match(emails[0].html, /api\/contact\/attachment/);
  assert.match(emails[0].text, /14 days/);
  assert.match(emails[0].text, /model.stl/);
});
test('inquiries without attachments still work', async () => {
  const { post, emails } = route();
  assert.equal((await post(request(undefined))).status, 200);
  assert.equal(emails.length, 1);
});
test('invalid paths, too many files, and oversized stored files are rejected before email', async () => {
  for (const attachments of [['https://example.com/file'], Array(6).fill(path)]) {
    const { post, emails } = route();
    assert.equal((await post(request(attachments))).status, 400);
    assert.equal(emails.length, 0);
  }
  const { post, emails } = route({ size: 30 * 1024 * 1024 + 1 });
  assert.equal((await post(request([path]))).status, 400);
  assert.equal(emails.length, 0);
});
