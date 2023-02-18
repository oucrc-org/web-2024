import { envsafe, str } from 'envsafe';
import { clientEnv } from './client-env';

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') {
  throw new Error(
    'Server-side environment variables are not available on browser'
  );
}

/**
 * サーバーサイドで**のみ**使用可能な環境変数
 */
export const env = {
  ...clientEnv,
  ...envsafe({
    MICROCMS_API_KEY: str({}),
    MICROCMS_SERVICE_DOMAIN: str({}),
    /**
     * article更新時に送信するWebhookを検証するためのシークレット
     */
    MICROCMS_ARTICLE_WEBHOOK_SECRET: str({}),
    /**
     * member更新時に送信するWebhookを検証するためのシークレット
     */
    MICROCMS_MEMBER_WEBHOOK_SECRET: str({}),
    /**
     * news更新時に送信するWebhookを検証するためのシークレット
     */
    MICROCMS_NEWS_WEBHOOK_SECRET: str({}),
    /**
     * 更新通知用Slack WebhookのURL
     */
    SLACK_NOTICE_WEBHOOK_URL: str({}),
  }),
};
