import { createClient } from 'microcms-js-sdk';
import { serverEnv } from '@/utils/server-env';
import PromiseThrottle from 'promise-throttle';

const _client = createClient({
  serviceDomain: serverEnv.MICROCMS_SERVICE_DOMAIN,
  apiKey: serverEnv.MICROCMS_API_KEY,
});

const promiseThrottle = new PromiseThrottle({
  requestsPerSecond: 60,
});

/**
 * 429を回避する
 * 本来アプリ動作中は429にほとんど遭遇しないが、これを挟まないとビルド時にfetch失敗する
 * @see https://zenn.dev/the_fukui/articles/microcms-avoid-get-429
 */
const handler: ProxyHandler<typeof _client> = {
  get: (target, action: keyof typeof _client) => (args: any) => {
    // @ts-ignore
    const throttledRequest = promiseThrottle.add(() => target[action](args));
    return throttledRequest;
  },
};

export const client = new Proxy(_client, handler);

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
