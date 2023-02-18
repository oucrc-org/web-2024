import { NextApiRequest, NextApiResponse } from 'next';
import { constants } from 'http2';
import { microCMSWebhookBody } from '@/types/micro-cms';
import { getPathByWebhook, verifyMicroCmsWebhook } from '@/utils/micro-cms';
import { notifyUpdateToSlack } from '@/utils/slack';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res
      .status(constants.HTTP_STATUS_METHOD_NOT_ALLOWED)
      .json({ message: 'Only POST is allowed' });
  }
  const body = req.body;
  /**
   * Content-Type:application/jsonかつ
   * → JSONを送った: Object
   * → JSON不正: Nextが400エラーを返す
   */
  if (typeof body !== 'object') {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      message: 'Set Content-Type as application/json and send valid JSON',
    });
  }
  try {
    // ここでエンドポイントとidフィールドの存在が確認される
    const parsedBody = microCMSWebhookBody.parse(body);
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
  } catch (e: any) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(
      // zodエラー読めるようにしている
      typeof e === 'object'
        ? { message: e.message, ...e }
        : { message: JSON.stringify(e) }
    );
  }
}
