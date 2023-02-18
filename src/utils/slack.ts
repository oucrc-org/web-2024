import { env } from './server-env';
import { Message, Blocks, Elements } from 'slack-block-builder';
import { MicroCMSWebhookBody } from '@/types/micro-cms';
import { getPathByWebhook } from './micro-cms';
import { DOMAIN } from '@/config/const';

/**
 * Slackにツイート内容を通知
 * @param parsedBody zodでバリデーションしたWebhook
 */
export const notifyUpdateToSlack = async (parsedBody: MicroCMSWebhookBody) => {
  const { api, type, contents } = parsedBody;
  const action =
    type === 'new' ? '新規作成' : type === 'edit' ? '更新' : '削除';
  const needsToTweet = api === 'article' && type === 'new';
  const url = DOMAIN + getPathByWebhook(parsedBody);
  const newContent = contents.new.publishValue;
  const tweetText = `【記事が投稿されました】\n${newContent?.title}\n${
    newContent?.twitter_comment ?? ''
  }\n`;
  const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(tweetText)}`;

  const message = Message()
    .blocks(
      Blocks.Section({ text: `[oucrc.net] ${api}が${action}されました。` }),
      needsToTweet
        ? [
            Blocks.Divider(),
            Blocks.Section({
              text: '以下のボタンからツイートしてください。',
            }),
            Blocks.Section({
              text: `ツイート内容:\n\`\`\`${tweetText}\n${url}\`\`\``,
            }),
            Blocks.Actions().elements(
              Elements.Button()
                .text(':twitter: ツイートする')
                .actionId('tweet')
                .url(tweetUrl)
                .primary()
            ),
          ]
        : Blocks.Section({ text: '広報による通知の必要はありません。' })
    )
    .buildToObject();
  return await fetch(env.SLACK_NOTICE_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({ ...message, icon_emoji: ':sparkles:' }),
  });
};
