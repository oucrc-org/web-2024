import { MicroCMSWebhookBody } from '@/types/micro-cms';
/**
 * APIルートのテストを簡単に書けるパッケージ
 * @see https://qiita.com/tatsuya-miyamoto/items/f99eb069f65b30f2f816
 */
import { testApiHandler } from 'next-test-api-route-handler';
import handler from '../pages/api/revalidate';

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

/**
 * GETが弾かれるか
 */
describe('next-test-api-route-handler test', () => {
  test('Send GET to revalidate API', async () => {
    expect.hasAssertions();
    await testApiHandler({
      requestPatcher: (req) => (req.url = '/api/revalidate'),
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'GET',
        });
        expect(await res.json()).toStrictEqual({
          message: 'Only POST is allowed',
        });
      },
    });
  });
  /**
   * 署名なしで正しい形式のbodyを送信して弾かれるか
   */
  test('Send POST without signature to revalidate API', async () => {
    expect.hasAssertions();
    await testApiHandler({
      requestPatcher: (req) => (req.url = '/api/revalidate'),
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(mockWebhookBody),
        });
        expect(await res.json()).toStrictEqual({
          message: 'Required header x-microcms-signature is not set',
        });
      },
    });
  });
});
