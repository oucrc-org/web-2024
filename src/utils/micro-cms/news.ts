import { News, NEWS_LIST_FIELDS } from '@/types/micro-cms';
import { clientEnv } from '@/config/client-env';
import { buildFilters, client } from './client';

/** generateStaticParamsで使用 IDだけを取得 */
export async function getAllNewsIds() {
  const searchQuery: string[] = [];
  return await client.getList<News>({
    endpoint: 'news',
    queries: {
      limit: 1000,
      fields: 'id',
      orders: '-date,-createdAt',
      filters: buildFilters(searchQuery, 'date'),
    },
  });
}

export async function getNewses(page: number) {
  return await client
    .getList<News>({
      endpoint: 'news',
      queries: {
        limit: clientEnv.ARTICLE_COUNT_PER_PAGE,
        offset: page < 2 ? 0 : (page - 1) * 9,
        fields: NEWS_LIST_FIELDS,
        orders: '-important,-date,-createdAt',
        filters: buildFilters([], 'date'),
      },
    })
    .catch(() => {
      return null;
    });
}

export async function getNews(contentId: string) {
  return await client
    .get<News>({
      endpoint: 'news',
      contentId,
    })
    .catch(() => {
      return null;
    });
}
