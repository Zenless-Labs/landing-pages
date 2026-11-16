import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const styles = await readFile(
  new URL('../app/globals.css', import.meta.url),
  'utf8',
);

test('decorative motion respects reduced-motion preferences', () => {
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(
    styles,
    /prefers-reduced-motion[\s\S]*animation:\s*none\s*!important/,
  );
});

test('the configured Geist font variable is used consistently', async () => {
  const layout = await readFile(
    new URL('../app/layout.tsx', import.meta.url),
    'utf8',
  );
  assert.match(layout, /variable:\s*'--font-geist-mono'/);
  assert.match(styles, /font-family:\s*var\(--font-geist-mono\)/);
});
