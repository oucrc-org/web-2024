import { microCMSWebhookBody } from '@/types/micro-cms';
import {
  getPathsByWebhook,
  getErrorResponseIfInvalidWebhook,
} from '@/utils/micro-cms';
import { notifyUpdateToSlack } from '@/utils/slack';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    // エンドポイントとidフィールドの存在確認
    const parsedBody = microCMSWebhookBody.parse(data);

    const errorResponse = await getErrorResponseIfInvalidWebhook(
      parsedBody,
      req
    );

    if (errorResponse) {
      return errorResponse;
    } else {
      await notifyUpdateToSlack(parsedBody);
      const paths = getPathsByWebhook(parsedBody);
      paths.forEach((path) => revalidatePath(path));
      return NextResponse.json(
        `Revalidated the following path by microCMS webhook` + paths.join(', '),
        { status: 200 }
      );
    }
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(`Invalid webhook`, { status: 410 });
    } else {
      return NextResponse.json(`Internal server error`, { status: 500 });
    }
  }
}
