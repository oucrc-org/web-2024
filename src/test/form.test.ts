import { constants } from 'http2';
/**
 * APIルートのテストを簡単に書けるパッケージ
 * @see https://qiita.com/tatsuya-miyamoto/items/f99eb069f65b30f2f816
 */
import { testApiHandler } from 'next-test-api-route-handler';
import { POST } from '../app/api/form/[formType]/route';

describe('Test for API route `/api/form/[formType]`', () => {
  // TODO: テストのApp Router Router Handler対応
  test('App Router Route Handler対応していないのでテスト不能', () => {});
  // test('存在しないフォームへのPOST', async () => {
  //   expect.hasAssertions();
  //   await testApiHandler({
  //     params: { formType: 'foobar' },
  //     handler: POST,
  //     test: async ({ fetch }) => {
  //       const res = await fetch({
  //         method: 'POST',
  //       });
  //       expect(await res.json()).toStrictEqual({
  //         message: 'Not found',
  //       });
  //     },
  //   });
  // });
  // test('内容無しで問い合わせフォームにPOST', async () => {
  //   expect.hasAssertions();
  //   await testApiHandler({
  //     params: { formType: 'contact' },
  //     handler: POST,
  //     test: async ({ fetch }) => {
  //       const res = await fetch({
  //         method: 'POST',
  //       });
  //       expect(res.status).toStrictEqual(constants.HTTP_STATUS_BAD_REQUEST);
  //     },
  //   });
  // });
  // /**
  //  * 内容無しで入部フォームにPOST
  //  */
  // test('POST join form API without body', async () => {
  //   expect.hasAssertions();
  //   await testApiHandler({
  //     params: { formType: 'join' },
  //     handler: POST,
  //     test: async ({ fetch }) => {
  //       const res = await fetch({
  //         method: 'POST',
  //       });
  //       expect(res.status).toStrictEqual(constants.HTTP_STATUS_BAD_REQUEST);
  //     },
  //   });
  // });
});
