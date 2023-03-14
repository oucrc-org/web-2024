import { getArticle } from '@/utils/micro-cms';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { PageConfig } from 'next/types';

/** Nodeランタイムを指定しないと動作しない */
export const config: PageConfig = { runtime: 'nodejs' };
export type PreviewData = { articleId?: string; draftKey?: string };

/**
 * app directoryに対応したプレビューデータの設定
 * @see https://github.com/estubmo/nextjs-blog-cms-sanity-v3/blob/main/pages/api/preview.ts
 */
function redirectToPreview(
  res: NextApiResponse<string | void>,
  previewData: PreviewData | null,
  Location: '/' | `/articles/${string}`
): void {
  if (previewData) {
    res.setPreviewData(previewData);
  } else {
    console.info('clear preview data');
    res.clearPreviewData();
  }
  res.writeHead(307, { Location });
  res.end();
}

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse<string | void>
) {
  let previewData: PreviewData | null = null;
  if (typeof req.query.draftKey === 'string') {
    previewData = {};
    previewData.draftKey = req.query.draftKey;
    if (typeof req.query.articleId === 'string') {
      previewData.articleId = req.query.articleId;
      const article = await getArticle(req.query.articleId, req.query.draftKey);
      if (article) {
        redirectToPreview(res, previewData, `/articles/${article.id}`);
      }
    }
  }
  return redirectToPreview(res, previewData, '/');
}
