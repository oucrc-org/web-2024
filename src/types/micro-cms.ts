import type {
  MicroCMSContentId,
  MicroCMSImage,
  MicroCMSDate,
} from 'microcms-js-sdk';

type Maybe<T> = T | null;
type MicroCMSBase = MicroCMSContentId & MicroCMSDate;

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
  body: string;
  twitter_comment: Maybe<string>;
  image: Maybe<MicroCMSImage>;
} & MicroCMSBase;
