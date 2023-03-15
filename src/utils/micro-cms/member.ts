import { Member, MEMBER_LIST_FIELDS } from '@/types/micro-cms';
import dayjs from 'dayjs';
import { clientEnv } from '@/utils/client-env';
import { buildFilters, client } from './client';

/** 過去 MAX_MEMBER_YEARS 年間の部員だけを取得する */
export function getPastTermYears() {
  const termYear = dayjs().subtract(3, 'month').year();
  const maxYears = clientEnv.MAX_MEMBER_YEARS;
  return Array.from(
    { length: maxYears },
    (_, i) => i + termYear - maxYears + 1
  );
}

/** OB全員を取得すると重すぎるため、特定の年度の部員だけを取得するフィルタを作成 */
function buildYearFilter() {
  // ORで繋ぐことで複数の入学年度に対応
  const yearFilter = getPastTermYears()
    .map((y) => `enteryear[equals]${y}`)
    .join('[or]');

  return buildFilters([yearFilter]);
}

/** generateStaticParamsで使用 IDだけを取得 */
export async function getAllMemberIds() {
  return await client.getList<Member>({
    endpoint: 'member',
    queries: {
      limit: 1000,
      fields: 'id',
      filters: buildYearFilter(),
      orders: '-enteryear',
    },
  });
}

export async function getMembers() {
  return await client.getList<Member>({
    endpoint: 'member',
    queries: {
      limit: 100,
      fields: MEMBER_LIST_FIELDS,
      filters: buildYearFilter(),
      // ソートはmicroCMSに任せる
    },
  });
}

export async function getMember(contentId: string) {
  return await client
    .get<Member>({
      endpoint: 'member',
      contentId,
    })
    .catch(() => {
      return null;
    });
}
