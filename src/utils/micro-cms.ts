import {
  Article,
  Category,
  MicroCMSWebhookBody,
  News,
  Member,
  ARTICLE_LIST_FIELDS,
  CATEGORY_LIST_FIELDS,
  NEWS_LIST_FIELDS,
  MEMBER_LIST_FIELDS,
  Series,
  SERIES_LIST_FIELDS,
} from '@/types/micro-cms';
import { createHmac, timingSafeEqual } from 'crypto';
import dayjs from 'dayjs';
import { createClient } from 'microcms-js-sdk';
import { NextApiRequest } from 'next';
import { clientEnv } from './client-env';
import { parseHtml, parseMarkdown } from './content-parser';
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

/**
 * 条件をANDで繋いで返す
 */
const buildFilters = (
  /** 条件 */
  array: Array<string | null | undefined>,
  /** 日付カラム名を指定すると「現在日時以前」に絞る */
  dateColumnName?: string
) => {
  const result: string[] = dateColumnName
    ? [`${dateColumnName}[less_than]${new Date().toISOString()}`]
    : [];
  return [...result, ...array.filter((str) => typeof str === 'string')].join(
    '[and]'
  );
};

/**
 * -----------------------
 * 記事
 */

export const getAllArticles = async ({
  /**
   * カテゴリ内のページ算出に必要
   */
  categoryId,
  /**
   * シリーズ内のページ算出に必要
   */
  seriesId,
}: { categoryId?: string; seriesId?: string } = {}) => {
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
};

export const getArticles = async (
  page: number,
  {
    categoryId,
    seriesId,
  }: {
    categoryId?: string;
    seriesId?: string;
  } = {}
) => {
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
};

/**
 * 記事を取得しつつ、本文をパースする
 * - `markdown_body`がない場合、`body`は構文ハイライトを追加して上書きされる
 * - `markdown_body`がある場合、`body`はMarkdownのパース結果で上書きされる
 */
export const getArticle = async (contentId: string, draftKey?: string) => {
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
      fields: ARTICLE_LIST_FIELDS,
      filters: buildFilters(
        [`name[equals]${article.name.id}','id[not_equals]${article.id}`],
        'date'
      ),
      limit,
    },
  });
};
/**
 * 部員による他記事の取得
 */
export const getArticlesByMember = async (member: Member, limit = 6) => {
  return await client.getList<Article>({
    endpoint: 'article',
    queries: {
      fields: ARTICLE_LIST_FIELDS,
      filters: buildFilters([`name[equals]${member.id}`], 'date'),
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
      fields: ARTICLE_LIST_FIELDS,
      filters: buildFilters(searchQuery, 'date'),
      limit,
    },
  });
};

/**
 * -----------------------------
 * カテゴリー
 */

export const getAllCategories = async () => {
  return await client.getList<Category>({
    endpoint: 'category',
    queries: {
      limit: 100,
      fields: CATEGORY_LIST_FIELDS,
    },
  });
};
export const getCategory = async (contentId: string) => {
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
};

/**
 * -----------------------------
 * シリーズ
 */

export const getAllSerieses = async () => {
  return await client.getList<Series>({
    endpoint: 'series',
    queries: {
      limit: 100,
      fields: SERIES_LIST_FIELDS,
    },
  });
};
export const getSeries = async (contentId: string) => {
  return await client
    .get<Series>({
      endpoint: 'series',
      contentId,
      queries: {
        fields: SERIES_LIST_FIELDS,
      },
    })
    .catch(() => {
      return null;
    });
};

/**
 * -----------------------------------
 * お知らせ
 */

export const getAllNewses = async () => {
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
};
export const getNewses = async (page: number) => {
  return await client.getList<News>({
    endpoint: 'news',
    queries: {
      limit: clientEnv.ARTICLE_COUNT_PER_PAGE,
      offset: page < 2 ? 0 : (page - 1) * 9,
      fields: NEWS_LIST_FIELDS,
      orders: '-important,-date,-createdAt',
      filters: buildFilters([], 'date'),
    },
  });
};
export const getNews = async (contentId: string) => {
  return await client
    .get<News>({
      endpoint: 'news',
      contentId,
    })
    .catch(() => {
      return null;
    });
};

/**
 * --------------------------
 * メンバー
 */

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

export const getAllMembers = async () => {
  return await client.getList<Member>({
    endpoint: 'member',
    queries: {
      limit: 1000,
      fields: 'id',
      filters: buildYearFilter(),
      orders: '-enteryear',
    },
  });
};
export const getMembers = async () => {
  return await client.getList<Member>({
    endpoint: 'member',
    queries: {
      limit: 100,
      fields: MEMBER_LIST_FIELDS,
      filters: buildYearFilter(),
      // ソートはmicroCMSに任せる
    },
  });
};
export const getMember = async (contentId: string) => {
  return await client
    .get<Member>({
      endpoint: 'member',
      contentId,
    })
    .catch(() => {
      return null;
    });
};
