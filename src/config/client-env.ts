import { bool, envsafe, num, str } from 'envsafe';

/**
 * クライアントサイドで使用可能な環境変数
 */
export const clientEnv = envsafe({
  /** アナリティクスを埋め込んだ Tag Manager　のID or アナリティクスのgtag ID */
  GTM_ID: str({
    input: process.env.NEXT_PUBLIC_GTM_ID,
    allowEmpty: true,
    default: '',
  }),
  /** 一覧における1ページあたりの記事数 */
  ARTICLE_COUNT_PER_PAGE: num({
    input: process.env.NEXT_PUBLIC_ARTICLE_COUNT_PER_PAGE,
    allowEmpty: true,
    default: 9,
  }),
  /** 部員一覧に表示する対象の年度数 デフォルトでは8年前の入部者まで表示 */
  MAX_MEMBER_YEARS: num({
    input: process.env.NEXT_PUBLIC_MAX_MEMBER_YEARS,
    allowEmpty: true,
    default: 8,
  }),
  /** 所謂検索避けをするならtrue */
  NOINDEX: bool({
    input: process.env.NEXT_PUBLIC_NOINDEX,
    allowEmpty: true,
    default: false,
  }),
});
