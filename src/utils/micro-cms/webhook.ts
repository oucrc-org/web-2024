import { MicroCMSWebhookBody } from '@/types/micro-cms';
import { createHmac, timingSafeEqual } from 'crypto';
import { NextRequest } from 'next/server';
import { serverEnv } from '@/config/server-env';

/**
 * WebhookがMicroCMSから送信されたかを検証する
 * @see https://document.microcms.io/manual/webhook-setting
 */
export async function verifyMicroCmsWebhook(
  parsedBody: MicroCMSWebhookBody,
  request: NextRequest
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

  const expectedSignature = createHmac('sha256', secretEnv)
    .update(JSON.stringify(parsedBody))
    .digest('hex');
  const signature = request.headers.get('x-microcms-signature');

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

/**
 * 更新対象パスの取得
 * @returns [一覧パス, 個別パス]
 */
export function getPathsByWebhook(parsedBody: MicroCMSWebhookBody) {
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
  return [pathname, `${pathname}/${parsedBody.id}`];
}
