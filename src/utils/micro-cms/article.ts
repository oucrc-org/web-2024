import { Article, ARTICLE_LIST_FIELDS, Member } from '@/types/micro-cms';
import { clientEnv } from '@/utils/client-env';
import { parseHtml, parseMarkdown } from '@/utils/content-parser';
import { buildFilters, client } from './client';

/** generateStaticParamsで使用 IDだけを取得 */
export async function getAllArticleIds({
  /**
   * カテゴリ内のページ算出に必要
   */
  categoryId,
  /**
   * シリーズ内のページ算出に必要
   */
  seriesId,
}: { categoryId?: string; seriesId?: string } = {}) {
  const searchQuery: string[] = [];
  if (categoryId) searchQuery.push(`category[equals]${categoryId}`);
  if (seriesId) searchQuery.push(`series[equals]${seriesId}`);
  return await client.getList<Article>({
    endpoint: 'article',
    queries: {
      limit: 1000,
      fields: 'id',
      orders: '-date,-createdAt',
      filters: buildFilters(searchQuery, 'date'),
    },
  });
}

export async function getArticles(
  page: number,
  {
    categoryId,
    seriesId,
  }: {
    categoryId?: string;
    seriesId?: string;
  } = {}
) {
  const searchQuery: string[] = [];
  if (categoryId) searchQuery.push(`category[equals]${categoryId}`);
  if (seriesId) searchQuery.push(`series[equals]${seriesId}`);
  return await client.getList<Article>({
    endpoint: 'article',
    queries: {
      limit: clientEnv.ARTICLE_COUNT_PER_PAGE,
      offset: page < 2 ? 0 : (page - 1) * 9,
      fields: ARTICLE_LIST_FIELDS,
      orders: '-date,-createdAt',
      filters: buildFilters(searchQuery, 'date'),
    },
  });
}

/**
 * 記事を取得しつつ、本文をパースする
 * - `markdown_body`がない場合、`body`は構文ハイライトを追加して上書きされる
 * - `markdown_body`がある場合、`body`はMarkdownのパース結果で上書きされる
 */
export async function getArticle(contentId: string, draftKey?: string) {
  return await client
    .get<Article>({
      endpoint: 'article',
      contentId,
      queries: {
        draftKey,
      },
    })
    .then(async (article) => {
      let body = article.body;
      if (article.markdown_body) {
        body = await parseMarkdown(article.markdown_body);
      } else {
        body = await parseHtml(article.body);
      }
      return {
        ...article,
        body,
      };
    })
    .catch(() => {
      return null;
    });
}

/**
 * 同部員による他記事の取得
 * 旧サイトの`pages/articles/_id.vue`より移植
 */
export async function getOtherArticlesBySameMember(
  article: Article,
  limit = 3
) {
  return await client.getList<Article>({
    endpoint: 'article',
    queries: {
      fields: ARTICLE_LIST_FIELDS,
      filters: buildFilters(
        [`name[equals]${article.name.id}','id[not_equals]${article.id}`],
        'date'
      ),
      limit,
    },
  });
}

/**
 * 部員による他記事の取得
 */
export async function getArticlesByMember(member: Member, limit = 6) {
  return await client.getList<Article>({
    endpoint: 'article',
    queries: {
      fields: ARTICLE_LIST_FIELDS,
      filters: buildFilters([`name[equals]${member.id}`], 'date'),
      limit,
    },
  });
}

/**
 * おすすめ記事の取得
 * 旧サイトの`pages/articles/_id.vue`より移植
 * TODO: カテゴリ以外の要素も考慮できるようにする
 */
export async function getRecommendedArticles(article: Article, limit = 4) {
  const searchQuery: string[] = [`id[not_equals]${article.id}`];
  if (article.category) {
    // カテゴリがあれば同カテゴリの記事に絞る
    searchQuery.push(`category[equals]${article.category.id}`);
  }
  return await client.getList<Article>({
    endpoint: 'article',
    queries: {
      fields: ARTICLE_LIST_FIELDS,
      filters: buildFilters(searchQuery, 'date'),
      limit,
    },
  });
}
