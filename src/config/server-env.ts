import { bool, envsafe, num, str } from 'envsafe';
import { clientEnv } from './client-env';

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') {
  throw new Error(
    'Server-side environment variables are not available on browser'
  );
}

/**
 * サーバーサイドで**のみ**使用可能な環境変数
 */
export const serverEnv = {
  ...clientEnv,
  ...envsafe({
    MICROCMS_REQUESTS_PER_SECOND: num({
      allowEmpty: true,
      default: 30, // 本来60だが、ビルド時を考慮して下げている
    }),
    /** 最大記事数。ローカルで動作確認時に下げることでビルドを短縮できる */
    MICROCMS_MAX_GET_COUNT: num({
      allowEmpty: true,
      default: 10000,
    }),
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
     * お問い合わせGoogleフォームのID
     */
    GOOGLE_FORM_ID_CONTACT: str({}),
    /**
     * 入部GoogleフォームのID
     */
    GOOGLE_FORM_ID_JOIN: str({}),
    /** Googleフォーム動作をモックするか */
    GOOGLE_FORM_MOCK: bool({ allowEmpty: true, default: false }),
    /**
     * 更新通知用Slack WebhookのURL
     */
    SLACK_NOTICE_WEBHOOK_URL: str({}),
  }),
};
