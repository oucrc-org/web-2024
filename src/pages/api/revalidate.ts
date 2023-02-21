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

    const pathToValidate = getPathByWebhook(parsedBody);
    return await res
      .revalidate(pathToValidate)
      .catch(() => {
        console.error(`Failed to revalidate but proceed to slack notification`);
      })
      .finally(() => {
        notifyUpdateToSlack(parsedBody);
        const message = `Revalidated the following path by microCMS webhook: ${pathToValidate}`;
        // NetlifyのFunction Logで確認できるように
        console.log(message);
        return res.status(200).json({ message });
      });
  });
}
