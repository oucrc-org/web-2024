import { MicroCMSWebhookBody } from '@/types/micro-cms';
import { createHmac, timingSafeEqual } from 'crypto';
import { NextApiRequest } from 'next';
import { serverEnv } from '@/utils/server-env';

/**
 * WebhookがMicroCMSから送信されたかを検証する
 * @see https://document.microcms.io/manual/webhook-setting
 */
export function verifyMicroCmsWebhook(
  parsedBody: MicroCMSWebhookBody,
  /** webhookを受け取るAPIルート */
  request: NextApiRequest
) {
  let secretEnv: string | null = null;
  const { api } = parsedBody;
  switch (api) {
    case 'article':
      secretEnv = serverEnv.MICROCMS_ARTICLE_WEBHOOK_SECRET;
      break;
    case 'member':
      secretEnv = serverEnv.MICROCMS_MEMBER_WEBHOOK_SECRET;
      break;
    case 'news':
      secretEnv = serverEnv.MICROCMS_NEWS_WEBHOOK_SECRET;
      break;
  }
  if (!secretEnv) {
    throw new Error(
      'Set required environment variables to verify webhook signature'
    );
  }
  // nextがbodyをObjectにしてしまうためstringify
  const expectedSignature = createHmac('sha256', secretEnv)
    .update(JSON.stringify(request.body))
    .digest('hex');
  const signature = request.headers['x-microcms-signature'];
  if (typeof signature !== 'string') {
    throw new Error('Required header x-microcms-signature is not set');
  }
  const valid = timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
  if (!valid) {
    throw new Error('Could not verify webhook signature');
  }
}

export function getPathByWebhook(parsedBody: MicroCMSWebhookBody) {
  const endpoint = parsedBody.api;
  let pathname = '';
  switch (endpoint) {
    case 'article':
      pathname = '/articles';
      break;
    case 'news':
      pathname = '/news';
      break;
    case 'member':
      pathname = '/members';
      break;
  }
  return `${pathname}/${parsedBody.id}`;
}
