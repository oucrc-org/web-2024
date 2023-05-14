import { MicroCMSWebhookBody } from '@/types/micro-cms';
import { createHmac, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { serverEnv } from '@/config/server-env';

/**
 * Webhookの署名を検証
 * @returns 不正の場合のみエラーレスポンス
 * @see https://document.microcms.io/manual/webhook-setting
 */
export async function getErrorResponseIfInvalidWebhook(
  parsedBody: MicroCMSWebhookBody,
  request: NextRequest
): Promise<void | NextResponse> {
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
    return NextResponse.json(
      `\`MICROCMS_(ARTICLE|MEMBER|NEWS)_WEBHOOK_SECRET\` is not set`,
      {
        status: 503,
      }
    );
  }

  const expectedSignature = createHmac('sha256', secretEnv)
    .update(JSON.stringify(parsedBody))
    .digest('hex');
  const signature = request.headers.get('x-microcms-signature');

  if (typeof signature !== 'string') {
    return NextResponse.json(
      'Required header x-microcms-signature is not set',
      {
        status: 400,
      }
    );
  }
  const valid = timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );

  if (!valid) {
    return NextResponse.json('Invalid signature', {
      status: 401,
    });
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
