import { NextApiRequest, NextApiResponse } from 'next';
import { microCMSWebhookBody } from '@/types/micro-cms';
import { getPathByWebhook, verifyMicroCmsWebhook } from '@/utils/micro-cms';
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
    const pathToValidate = getPathByWebhook(parsedBody);
    return await res
      .revalidate(pathToValidate)
      .then(() => {
        message = `Revalidated the following path by microCMS webhook: ${pathToValidate}`;
      })
      .catch(() => {
        message = 'Failed to revalidate but proceed to slack notification';
      })
      .finally(async () => {
        return res.status(200).json({ message });
      });
  });
}
