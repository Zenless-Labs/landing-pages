import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { ATTACHMENT_PATH, MAX_ATTACHMENT_BYTES } from '@/lib/attachment-limits';

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ error: 'Attachments are temporarily unavailable. You can still send a reference link.' }, { status: 503 });
  }
  try {
    const body = await request.json() as HandleUploadBody;
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (request.headers.get('origin') !== new URL(request.url).origin || !ATTACHMENT_PATH.test(pathname)) {
          throw new Error('Invalid upload request.');
        }
        const payload = JSON.parse(clientPayload || '{}');
        const age = Date.now() - Number(payload.startedAt);
        if (payload.website || !Number.isFinite(age) || age < 1500 || age > 86_400_000) {
          throw new Error('Please refresh the form and try again.');
        }
        return {
          maximumSizeInBytes: MAX_ATTACHMENT_BYTES,
          ttlDays: 14,
          cacheControlMaxAge: 60,
          addRandomSuffix: false,
          allowOverwrite: false,
          validUntil: Date.now() + 60 * 60 * 1000,
        };
      },
      onUploadCompleted: async () => {},
    });
    return Response.json(result);
  } catch {
    return Response.json({ error: 'Unable to upload this file. Please try again.' }, { status: 400 });
  }
}
