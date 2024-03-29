import { serverEnv } from '@/config/server-env';
import { Category, CATEGORY_LIST_FIELDS } from '@/types/micro-cms';
import { client } from './client';

export async function getAllCategories() {
  return await client.getList<Category>({
    endpoint: 'category',
    queries: {
      limit: serverEnv.MICROCMS_MAX_GET_COUNT,
      fields: CATEGORY_LIST_FIELDS,
    },
  });
}

export async function getCategory(contentId: string) {
  return await client
    .get<Category>({
      endpoint: 'category',
      contentId,
      queries: {
        fields: CATEGORY_LIST_FIELDS,
      },
    })
    .catch(() => {
      return null;
    });
}
