import type {
  MicroCMSContentId,
  MicroCMSImage,
  MicroCMSDate,
} from 'microcms-js-sdk';
import { z } from 'zod';

type Maybe<T> = T | null;
type MicroCMSBase = MicroCMSContentId & MicroCMSDate;

export const microCMSEndpoints = ['article', 'news', 'member'] as const;
export const microCMSEndpointName = z.enum(microCMSEndpoints);
export type MicroCMSEndpointName = z.infer<typeof microCMSEndpointName>;

/**
 * ===================================================
 * 以下の型定義はmicroCMS上の設定に依存している
 * `web-2021`と共通のスキーマを用いるためプロパティ名は変更できない
 * ===================================================
 */

/**
 * CMS上の呼称:「メンバー」
 * エンドポイント: `/member`
 */
export type Member = {
  name: string;
  avatar: Maybe<MicroCMSImage>;
  enteryear: number;
  status: Maybe<string>;
  intro: Maybe<string>;
  introimage: Maybe<MicroCMSImage>;
  twitter: Maybe<string>;
  github: Maybe<string>;
  youtube: Maybe<string>;
} & MicroCMSBase;
/** 一覧で無駄なカラムを取得しないように定義 */
export const MEMBER_LIST_FIELDS = 'id,name,avatar,enteryear';

/**
 * CMS上の呼称:「カテゴリー」
 * エンドポイント: `/category`
 */
export type Category = {
  /**
   * 紛らわしいが、カテゴリ名
   */
  category: string;
} & MicroCMSBase;
/** 一覧で無駄なカラムを取得しないように定義 */
export const CATEGORY_LIST_FIELDS = 'id,category';

/**
 * CMS上の呼称:「シリーズ」
 * エンドポイント: `/series`
 */
export type Series = {
  /**
   * 紛らわしいが、シリーズ名
   */
  series: string;
  author: Maybe<Member>;
} & MicroCMSBase;
/** 一覧で無駄なカラムを取得しないように定義 */
export const SERIES_LIST_FIELDS = 'id,,series';
/**
 * CMS上の呼称:「お知らせ」
 * エンドポイント: `/news`
 */
export type News = {
  title: string;
  /**
   * 公開日時
   */
  date: Date;
  important: Maybe<boolean>;
  body: string;
  image: Maybe<MicroCMSImage>;
} & MicroCMSBase;
/** 一覧で無駄なカラムを取得しないように定義 */
export const NEWS_LIST_FIELDS = 'id,title';

/**
 * CMS上の呼称:「記事」
 * エンドポイント: `/article`
 */
export type Article = {
  title: string;
  /**
   * 公開日時
   */
  date: Date;
  name: Member;
  category: Maybe<Category>;
  series: Maybe<Series>;
  /** HTML。`markdown_body`がある場合、Markdownのパース結果で上書きされる */
  body: string;
  /** MD。記入されていればbodyより優先 */
  markdown_body: Maybe<string>;
  twitter_comment: Maybe<string>;
  image: Maybe<MicroCMSImage>;
} & MicroCMSBase;
/** 一覧で無駄なカラムを取得しないように定義 */
export const ARTICLE_LIST_FIELDS =
  'id,title,date,name,category,series,twitter_comment,image';

// ========================================================

const webhookContent = z.object({
  id: z.string(),
  status: z.array(z.enum(['PUBLISH', 'DRAFT'])),
  draftKey: z.string().nullable(),
  /**
   * ジェネリックを付けようとすると
   * APIの型を全てzod化する必要があるのでany
   */
  publishValue: z.record(z.any()).nullable(),
  draftValue: z.record(z.any()).nullable(),
});

/**
 * microCMSから送信されるWebhookのbody
 * zodで定義してバリデーション可能にする
 * @see https://document.microcms.io/manual/webhook-setting
 */
export const microCMSWebhookBody = z
  .object({
    service: z.string(),
    api: microCMSEndpointName,
    /** API関連の操作時はnull */
    id: z.string().nullable(),
    type: z.enum(['new', 'edit', 'delete']),
    contents: z.object({
      old: webhookContent.nullable(),
      new: webhookContent,
    }),
  })
  .passthrough(); // 将来的な仕様変更でフィールドが増えても有効に
export type MicroCMSWebhookBody = z.infer<typeof microCMSWebhookBody>;
