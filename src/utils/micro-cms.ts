import { Article, Category, MicroCMSWebhookBody } from '@/types/micro-cms';
import { createHmac, timingSafeEqual } from 'crypto';
import { createClient } from 'microcms-js-sdk';
import { NextApiRequest } from 'next';
import { parseHtml } from './html-parser';
import { env } from './server-env';

export const client = createClient({
  serviceDomain: env.MICROCMS_SERVICE_DOMAIN,
  apiKey: env.MICROCMS_API_KEY,
});

/**
 * WebhookがMicroCMSから送信されたかを検証する
 * @see https://document.microcms.io/manual/webhook-setting
 */
export const verifyMicroCmsWebhook = (
  parsedBody: MicroCMSWebhookBody,
  /** webhookを受け取るAPIルート */
  request: NextApiRequest
) => {
  let secretEnv: string | null = null;
  const { api } = parsedBody;
  switch (api) {
    case 'article':
      secretEnv = env.MICROCMS_ARTICLE_WEBHOOK_SECRET;
      break;
    case 'member':
      secretEnv = env.MICROCMS_MEMBER_WEBHOOK_SECRET;
      break;
    case 'news':
      secretEnv = env.MICROCMS_NEWS_WEBHOOK_SECRET;
      break;
  }
  if (!secretEnv) {
    throw new Error(
      'Set required environment variables to verify webhook signature'
    );
  }
  // nextがbodyをObjectにしてしまうためstringify
  const expectedSignature = createHmac('sha256', secretEnv)
    .update(JSON.stringify(request.body))
    .digest('hex');
  const signature = request.headers['x-microcms-signature'];
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
};

export const getPathByWebhook = (parsedBody: MicroCMSWebhookBody) => {
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
      pathname = '/member';
      break;
  }
  return `${pathname}/${parsedBody.id}`;
};

type ArticleOptions = {
  categoryId?: string;
  seriesId?: string;
};

const buildFilters = (array: string[]) => {
  return [`date[less_than]${new Date().toISOString()}`, ...array].join('[and]');
};

export const getAllArticles = async ({
  /**
   * カテゴリ内のページ算出に必要
   */
  categoryId,
}: { categoryId?: string } = {}) => {
  const searchQuery: string[] = [];
  if (categoryId) searchQuery.push(`category[equals]${categoryId}`);
  return await client.getList<Article>({
    endpoint: 'article',
    queries: {
      limit: 1000,
      fields: 'id',
      orders: '-date,-createdAt',
      filters: buildFilters(searchQuery),
    },
  });
};

export const getArticles = async (
  page: number,
  { categoryId, seriesId }: ArticleOptions = {}
) => {
  const searchQuery: string[] = [];
  if (categoryId) searchQuery.push(`category[equals]${categoryId}`);
  if (seriesId) searchQuery.push(`series[equals]${seriesId}`);
  return await client.getList<Article>({
    endpoint: 'article',
    queries: {
      limit: 9,
      offset: page < 2 ? 0 : (page - 1) * 9,
      fields: 'id,title,category,image,body',
      orders: '-date,-createdAt',
      filters: buildFilters(searchQuery),
    },
  });
};

export const getArticle = async (contentId: string) => {
  const article = await client.get<Article>({
    endpoint: 'article',
    contentId,
  });
  const body = await parseHtml(article.body);
  return {
    ...article,
    body,
  };
};

/**
 * 同部員による他記事の取得
 * 旧サイトの`pages/articles/_id.vue`より移植
 */
export const getOtherArticlesBySameMember = async (
  article: Article,
  limit = 3
) => {
  return await client.getList<Article>({
    endpoint: 'article',
    queries: {
      filters: buildFilters([
        `name[equals]${article.name.id}','id[not_equals]${article.id}`,
      ]),
      limit,
    },
  });
};
/**
 * おすすめ記事の取得
 * 旧サイトの`pages/articles/_id.vue`より移植
 * TODO: カテゴリ以外の要素も考慮できるようにする
 */
export const getRecommendedArticles = async (article: Article, limit = 4) => {
  const searchQuery: string[] = [`id[not_equals]${article.id}`];
  if (article.category) {
    // カテゴリがあれば同カテゴリの記事に絞る
    searchQuery.push(`category[equals]${article.category.id}`);
  }
  return await client.getList<Article>({
    endpoint: 'article',
    queries: {
      filters: buildFilters(searchQuery),
      limit,
    },
  });
};

export const getAllCategories = async () => {
  return await client.getList<Category>({
    endpoint: 'category',
    queries: {
      limit: 100,
      fields: 'id,category',
    },
  });
};
export const getCategory = async (contentId: string) => {
  return await client.get<Category>({
    endpoint: 'category',
    contentId,
    queries: {
      fields: 'id,category',
    },
  });
};
