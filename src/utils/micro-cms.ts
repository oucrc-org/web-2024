import { Article, Category } from '@/types/micro-cms';
import { createClient } from 'microcms-js-sdk';
import { env } from './server-env';

export const client = createClient({
  serviceDomain: env.MICROCMS_SERVICE_DOMAIN,
  apiKey: env.MICROCMS_API_KEY,
});

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
  return await client.get<Article>({
    endpoint: 'article',
    contentId,
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
