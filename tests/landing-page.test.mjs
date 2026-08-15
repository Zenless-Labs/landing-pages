import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const page = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8');
const styles = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');

test('landing page presents a custom, product-integrated AI services architecture', () => {
  assert.match(page, /Custom AI media, built into your product/);
  assert.match(page, /One click for your users/);
  assert.match(page, /Embedded Media Pipelines/);
  assert.match(page, /Adaptive Creative Systems/);
  assert.match(page, /Inference & Model Orchestration/);
  assert.match(page, /On-chain Product Engineering/);
  assert.match(page, /href="#services"/);
});

test('landing page presents custom 3D printing and prototyping as an additional capability', () => {
  assert.match(page, /Custom 3D Printing & Prototyping/);
  assert.match(page, /Bring your own model/);
  assert.match(page, /Custom 3D modeling/);
  assert.match(page, /Small-batch 3D printing/);
});

test('hero includes an accessible image-to-video motion illustration', () => {
  assert.match(page, /Animated illustration showing a still image becoming a video sequence/);
  assert.match(page, /motion-frame/);
  assert.match(styles, /@keyframes frame-shift/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(styles, /prefers-reduced-motion[\s\S]*\.motion-frame\.frame-one[\s\S]*opacity:\s*1/);
});

test('the configured Geist font variable is used consistently', async () => {
  const layout = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8');
  assert.match(layout, /variable:\s*'--font-geist-mono'/);
  assert.match(styles, /font-family:\s*var\(--font-geist-mono\)/);
});

test('every animated output frame renders a complete car silhouette', () => {
  assert.equal((page.match(/className="moving-car"/g) ?? []).length, 3);
  assert.equal((page.match(/className="moving-car-roof"/g) ?? []).length, 3);
  assert.equal((page.match(/className="moving-car-body"/g) ?? []).length, 3);
  assert.equal((page.match(/moving-car-wheel/g) ?? []).length, 6);
});
