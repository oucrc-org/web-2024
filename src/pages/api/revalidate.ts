import { NextApiRequest, NextApiResponse } from 'next';
import { microCMSWebhookBody } from '@/types/micro-cms';
import { getPathsByWebhook, verifyMicroCmsWebhook } from '@/utils/micro-cms';
import { notifyUpdateToSlack } from '@/utils/slack';
import { allowOnlyPostingObjectBody } from '@/utils/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await allowOnlyPostingObjectBody(req, res, async () => {
    // ここでエンドポイントとidフィールドの存在が確認される
    const parsedBody = microCMSWebhookBody.parse(req.body);
    // 署名を検証
    verifyMicroCmsWebhook(parsedBody, req);

    // Slack通知
    await notifyUpdateToSlack(parsedBody);

    // ページ更新処理
    let message = 'Failed to revalidate';
    const pathsToValidate = getPathsByWebhook(parsedBody);
    // 一覧を更新
    await res.revalidate(pathsToValidate[0]).catch(() => {
      message =
        'Failed to revalidate index page but proceed to slack notification';
    });
    // 個別ページ更新
    return await res
      .revalidate(pathsToValidate[1])
      .then(() => {
        message = `Revalidated the following path by microCMS webhook: ${pathsToValidate.join(
          ', '
        )}`;
      })
      .catch(() => {
        message =
          'Failed to revalidate article page but proceed to slack notification';
      })
      .finally(async () => {
        console.info(message);
        return res.status(200).json({ message });
      });
  });
}
