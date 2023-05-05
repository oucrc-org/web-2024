import { MicroCMSWebhookBody } from '@/types/micro-cms';
/**
 * APIルートのテストを簡単に書けるパッケージ
 * @see https://qiita.com/tatsuya-miyamoto/items/f99eb069f65b30f2f816
 */
import { testApiHandler } from 'next-test-api-route-handler';
import { POST } from '../app/api/revalidate/route';

const mockWebhookBody: MicroCMSWebhookBody = {
  service: 'test',
  id: 'abc123',
  api: 'article',
  type: 'new',
  contents: {
    new: {
      id: 'abc123',
      status: ['PUBLISH'],
      draftKey: 'secret',
      publishValue: {},
      draftValue: {},
    },
    old: {
      id: 'abc123',
      status: ['PUBLISH'],
      draftKey: 'secret',
      publishValue: {},
      draftValue: {},
    },
  },
};

describe('APIルート`/api/revalidate`の動作確認', () => {
  // TODO: テストのApp Router Router Handler対応
  test('App Router Route Handler対応していないのでテスト不能', () => {});
  // test('GETが弾かれるか', async () => {
  //   expect.hasAssertions();
  //   await testApiHandler({
  //     requestPatcher: (req) => (req.url = '/api/revalidate'),
  //     handler: POST,
  //     test: async ({ fetch }) => {
  //       const res = await fetch({
  //         method: 'GET',
  //       });
  //       expect(await res.json()).toStrictEqual({
  //         message: 'Only POST is allowed',
  //       });
  //     },
  //   });
  // });
  // test('署名なしで正しい形式のbodyを送信して弾かれるか', async () => {
  //   expect.hasAssertions();
  //   await testApiHandler({
  //     requestPatcher: (req) => (req.url = '/api/revalidate'),
  //     handler: POST,
  //     test: async ({ fetch }) => {
  //       const res = await fetch({
  //         method: 'POST',
  //         headers: {
  //           'content-type': 'application/json',
  //         },
  //         body: JSON.stringify(mockWebhookBody),
  //       });
  //       expect(await res.json()).toStrictEqual({
  //         message: 'Required header x-microcms-signature is not set',
  //       });
  //     },
  //   });
  // });
});
