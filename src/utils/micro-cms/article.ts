import { Article, ARTICLE_LIST_FIELDS } from '@/types/micro-cms';
import { clientEnv } from '@/config/client-env';
import { parseHtml, parseMarkdown } from '@/utils/content-parser';
import { buildFilters, client } from './client';
import { serverEnv } from '@/config/server-env';
import { MicroCMSQueries } from 'microcms-js-sdk';

async function constructArticle(article: Article) {
  let body = article.body;
  let error = null;
  const { markdown_enabled, body_markdown, body_html } = article;

  if (markdown_enabled && body_markdown && body_markdown.length > 0) {
    try {
      body = await parseMarkdown(body_markdown);
    } catch (e) {
      console.error(e);
      error = JSON.stringify((e as any).message ?? e, null, '\t');
      body = body_markdown;
    }
  } else if (body_html && body_html.length > 0) {
    try {
      body = await parseHtml(body_html);
    } catch (e) {
      console.error(e);
      error = JSON.stringify((e as any).message ?? e, null, '\t');
      body = body_html;
    }
  }

  return {
    ...article,
    body,
    error,
  };
}

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
      limit: serverEnv.MICROCMS_MAX_GET_COUNT,
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
  return await client
    .getList<Article>({
      endpoint: 'article',
      queries: {
        limit: clientEnv.ARTICLE_COUNT_PER_PAGE,
        offset: page < 2 ? 0 : (page - 1) * 9,
        fields: ARTICLE_LIST_FIELDS,
        orders: '-date,-createdAt',
        filters: buildFilters(searchQuery, 'date'),
      },
    })
    .catch(() => {
      return null;
    });
}

/**
 * 記事を取得
 */
export async function getArticle(contentId: string, queries?: MicroCMSQueries) {
  return await client
    .get<Article>({
      endpoint: 'article',
      contentId,
      queries,
    })
    .then(async (article) => await constructArticle(article))
    .catch(() => {
      return null;
    });
}

/**
 * 同部員による他記事の取得
 * 旧サイトの`pages/articles/_id.vue`より移植
 */
export async function getOtherArticlesBySameMember(
  articleId: string,
  queries?: MicroCMSQueries
) {
  const article = await client.get<Article>({
    endpoint: 'article',
    contentId: articleId,
  });
  return await client
    .getList<Article>({
      endpoint: 'article',
      queries: {
        fields: ARTICLE_LIST_FIELDS,
        filters: buildFilters(
          [`name[equals]${article.name.id}`, `id[not_equals]${articleId}`],
          'date'
        ),
        ...queries,
      },
    })
    .catch(() => {
      return null;
    });
}

/**
 * 部員による他記事の取得
 */
export async function getArticlesByMember(
  memberId: string,
  queries?: MicroCMSQueries
) {
  return await client
    .getList<Article>({
      endpoint: 'article',
      queries: {
        fields: ARTICLE_LIST_FIELDS,
        filters: buildFilters([`name[equals]${memberId}`], 'date'),
        limit: 6,
        ...queries,
      },
    })
    .catch(() => {
      return null;
    });
}

/**
 * おすすめ記事の取得
 * 旧サイトの`pages/articles/_id.vue`より移植
 * TODO: カテゴリ以外の要素も考慮できるようにする
 */
export async function getRecommendedArticles(
  articleId: string,
  queries?: MicroCMSQueries
) {
  const searchQuery: string[] = [`id[not_equals]${articleId}`];
  const article = await client.get<Article>({
    endpoint: 'article',
    contentId: articleId,
  });
  if (article.category) {
    // カテゴリがあれば同カテゴリの記事に絞る
    searchQuery.push(`category[equals]${article.category.id}`);
  }
  return await client
    .getList<Article>({
      endpoint: 'article',
      queries: {
        fields: ARTICLE_LIST_FIELDS,
        filters: buildFilters(searchQuery, 'date'),
        limit: 4,
        ...queries,
      },
    })
    .catch(() => {
      return null;
    });
}
