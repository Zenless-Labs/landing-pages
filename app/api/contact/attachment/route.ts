import { get } from '@vercel/blob';
import { ATTACHMENT_PATH } from '@/lib/attachment-limits';
import { validAttachmentSignature } from '@/lib/attachment-links';

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const pathname = params.get('path') || '';
  const signature = params.get('signature') || '';
  if (!ATTACHMENT_PATH.test(pathname) || !validAttachmentSignature(pathname, signature)) {
    return new Response('Invalid download link.', { status: 403 });
  }
  try {
    const result = await get(pathname, { access: 'private' });
    if (!result || result.statusCode !== 200) return new Response('File not found.', { status: 404 });
    return new Response(result.stream, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${pathname.split('/').pop()}"`,
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return new Response('Unable to download this file. Please try again.', { status: 502 });
  }
}
