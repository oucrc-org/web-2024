import { microCMSWebhookBody } from '@/types/micro-cms';
import { getPathsByWebhook, verifyMicroCmsWebhook } from '@/utils/micro-cms';
import { notifyUpdateToSlack } from '@/utils/slack';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const data = await req.json();
  let result = 'Failed to revalidate';
  let status = 500;
  try {
    // ここでエンドポイントとidフィールドの存在が確認される
    const parsedBody = microCMSWebhookBody.parse(data);

    if (parsedBody) {
      // 署名を検証
      verifyMicroCmsWebhook(parsedBody, req);

      // Slack通知
      await notifyUpdateToSlack(parsedBody);

      const pathsToValidate = getPathsByWebhook(parsedBody);
      // 一覧を更新
      try {
        revalidatePath(pathsToValidate[0]);
      } catch (e) {
        result =
          'Failed to revalidate index page but proceed to slack notification';
      }
      // 個別ページ更新
      try {
        revalidatePath(pathsToValidate[1]);
        result = `Revalidated the following path by microCMS webhook: ${pathsToValidate.join(
          ', '
        )}`;
      } catch (e) {
        result =
          'Failed to revalidate article page but proceed to slack notification';
      }
    }
    status = 200;
  } catch (e) {
    result = e as any;
    status = 400;
  }

  return NextResponse.json(result, { status });
}
