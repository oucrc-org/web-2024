import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk';
import { z } from 'zod';

type Maybe<T> = T | null;

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
} & MicroCMSListContent;
/** 一覧で無駄なカラムを取得しないように定義 */
export const MEMBER_LIST_FIELDS = 'id,name,status,avatar,enteryear';

/**
 * CMS上の呼称:「カテゴリー」
 * エンドポイント: `/category`
 */
export type Category = {
  /**
   * 紛らわしいが、カテゴリ名
   */
  category: string;
} & MicroCMSListContent;
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
} & MicroCMSListContent;
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
  date: Maybe<Date>;
  important: Maybe<boolean>;
  body: string;
  image: Maybe<MicroCMSImage>;
} & MicroCMSListContent;
/** 一覧で無駄なカラムを取得しないように定義 */
export const NEWS_LIST_FIELDS = 'id,title,date,createdAt';

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
  /** 概要の代わりにする */
  twitter_comment: Maybe<string>;
  image: Maybe<MicroCMSImage>;
} & MicroCMSListContent;

/**
 * 一覧で無駄なカラムを取得しないように定義
 * ここに本文がないため、旧サイトと違って一部記事の説明文がないように見える
 */
export const ARTICLE_LIST_FIELDS =
  'id,title,date,name,category,series,twitter_comment,image';

// ========================================================

const microCMSWebhookTypes = ['new', 'edit', 'delete'] as const;
/** `contents.(new|old).status` の値 */
const microCMSStatusWords = ['PUBLISH', 'DRAFT', 'CLOSED'] as const;

const webhookContent = z.object({
  id: z.string(),
  status: z.array(z.enum(microCMSStatusWords)),
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
    type: z.enum(microCMSWebhookTypes),
    contents: z.object({
      old: webhookContent.nullable(),
      new: webhookContent,
    }),
  })
  .passthrough(); // 将来的な仕様変更でフィールドが増えても有効に
export type MicroCMSWebhookBody = z.infer<typeof microCMSWebhookBody>;

/** Slack通知で使う CMS操作に対応する日本語 */
export const microCMSTypeRecord: Record<
  (typeof microCMSWebhookTypes)[number],
  string
> = {
  new: '作成',
  edit: '更新',
  delete: '削除',
} as const;

/** Slack通知で使う CMS操作に対応する絵文字 */
export const microCMSTypeEmojiRecord: Record<
  (typeof microCMSWebhookTypes)[number],
  string
> = {
  new: ':sparkles:', // きらきら
  edit: ':pencil2:', // 鉛筆
  delete: ':face_with_peeking_eye:', // 覗き見している顔
} as const;

/** Slack通知で使う CMS状態に対応する日本語 */
export const microCMSStatusRecord: Record<
  (typeof microCMSStatusWords)[number],
  string
> = {
  DRAFT: '下書き',
  PUBLISH: '公開',
  CLOSED: '公開終了',
} as const;
