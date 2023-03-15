import { createClient } from 'microcms-js-sdk';
import { serverEnv } from '@/utils/server-env';

export const client = createClient({
  serviceDomain: serverEnv.MICROCMS_SERVICE_DOMAIN,
  apiKey: serverEnv.MICROCMS_API_KEY,
});

/**
 * 条件をANDで繋いで返す
 */
export function buildFilters(
  /** 条件 */
  array: Array<string | null | undefined>,
  /** 日付カラム名を指定すると「現在日時以前」に絞る */
  dateColumnName?: string
) {
  const result: string[] = dateColumnName
    ? [`${dateColumnName}[less_than]${new Date().toISOString()}`]
    : [];
  return [...result, ...array.filter((str) => typeof str === 'string')].join(
    '[and]'
  );
}
