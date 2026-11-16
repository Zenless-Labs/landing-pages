import { createHmac, timingSafeEqual } from 'node:crypto';

export function signAttachment(pathname: string) {
  const secret = process.env.BLOB_READ_WRITE_TOKEN;
  if (!secret) throw new Error('Attachment storage is unavailable.');
  return createHmac('sha256', secret).update(`attachment:${pathname}`).digest('hex');
}

export function validAttachmentSignature(pathname: string, signature: string) {
  if (!/^[a-f0-9]{64}$/.test(signature)) return false;
  return timingSafeEqual(Buffer.from(signAttachment(pathname), 'hex'), Buffer.from(signature, 'hex'));
}
