import { serverEnv } from '@/config/server-env';
import {
  Message,
  Blocks,
  Elements,
  BlockBuilder,
  SectionBuilder,
} from 'slack-block-builder';
import {
  Article,
  microCMSStatusRecord,
  microCMSTypeEmojiRecord,
  microCMSTypeRecord,
  MicroCMSWebhookBody,
} from '@/types/micro-cms';
import { getPathsByWebhook } from './micro-cms';

function wrapWithCodeBlock(text: string) {
  return `\`\`\`\n${text}\n\`\`\``;
}

type BlockOrSection =
  | BlockBuilder
  | SectionBuilder
  | BlockBuilder[]
  | SectionBuilder[];

/**
 * Slackに記事のツイート内容を通知
 * Webhookの形式は全モデルで共通だが、ここでは記事のみ対応している
 * @param parsedBody zodでバリデーションしたWebhook
 */
export async function notifyUpdateToSlack(parsedBody: MicroCMSWebhookBody) {
  const { api, type, contents } = parsedBody;

  if (api === 'article') {
    const oldStatus =
      contents.old && contents.old.status[0] ? contents.old.status[0] : null;
    const newStatus =
      contents.new && contents.new.status[0] ? contents.new.status[0] : null;
    const action = `${oldStatus ? microCMSStatusRecord[oldStatus] : '無'}から${
      newStatus ? microCMSStatusRecord[newStatus] : '削除済み'
    }に${microCMSTypeRecord[type]}`;
    const url = 'https://oucrc.net' + getPathsByWebhook(parsedBody)[1];

    /** `slack-block-builder` の Blocks<BlockBuilder>.blocks の引数に合わせた型を指定している */
    let blocks: (BlockOrSection | undefined)[] = [];

    /**
     * 以下、ステータスの変化に応じて通知内容を決定
     */

    if (oldStatus !== 'PUBLISH' && newStatus === 'PUBLISH') {
      // 記事が公開された場合
      const newContent = contents.new.publishValue as Article;
      const tweetText = `【記事が投稿されました】\n${newContent?.title}\n${
        newContent?.twitter_comment ?? ''
      }\n`;
      const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(tweetText)}`;

      blocks = [
        Blocks.Section({
          text: `ツイート内容:\n${wrapWithCodeBlock(`${tweetText}\n${url}`)}`,
        }),
        newContent.image
          ? [
              Blocks.Section({
                text: '以下の画像をコピーして、ボタンからツイート画面を開いてペーストしてください。文章は自動で入力されます。',
              }),
              Blocks.Section({
                text: newContent.image.url,
              }),
            ]
          : [
              Blocks.Section({
                text: 'ボタンからツイート画面を開いてツイートしてください。この記事にサムネイル画像は添付されていません。文章は自動で入力されます。',
              }),
            ],
        Blocks.Actions().elements(
          Elements.Button()
            .text(':twitter: ツイートする')
            .actionId('tweet')
            .url(tweetUrl)
            .primary()
        ),
      ];
    }

    if (oldStatus === 'PUBLISH' && newStatus !== 'PUBLISH') {
      // 非公開になった場合
      blocks = [
        Blocks.Section({
          text: `以下の記事が${
            type === 'delete'
              ? '削除されました。'
              : newStatus
              ? microCMSStatusRecord[newStatus]
              : '取得不能'
          }になりました。`,
        }),
        Blocks.Section({
          text: wrapWithCodeBlock(url),
        }),
      ];
    }

    if (blocks.length > 0) {
      const message = Message()
        .blocks(
          Blocks.Section({ text: `[oucrc.net] 記事が${action}されました。` }),

          Blocks.Divider(),
          ...blocks
        )
        .buildToObject();
      return await fetch(serverEnv.SLACK_NOTICE_WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify({
          ...message,
          icon_emoji: microCMSTypeEmojiRecord[type],
        }),
      }).catch((e) => {
        console.error(e);
        return;
      });
    }
  }
  return;
}
