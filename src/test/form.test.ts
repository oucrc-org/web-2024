import { constants } from 'http2';
import { testApiHandler } from 'next-test-api-route-handler';
import handler from '../pages/api/form/[formType]';

describe('Test for API route `/api/form/[formType]`', () => {
  test('存在しないフォームへのPOST', async () => {
    expect.hasAssertions();
    await testApiHandler({
      params: { formType: 'foobar' },
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
        });
        expect(await res.json()).toStrictEqual({
          message: 'Not found',
        });
      },
    });
  });
  test('内容無しで問い合わせフォームにPOST', async () => {
    expect.hasAssertions();
    await testApiHandler({
      params: { formType: 'contact' },
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
        });
        expect(res.status).toStrictEqual(constants.HTTP_STATUS_BAD_REQUEST);
      },
    });
  });
  /**
   * 内容無しで入部フォームにPOST
   */
  test('POST join form API without body', async () => {
    expect.hasAssertions();
    await testApiHandler({
      params: { formType: 'join' },
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
        });
        expect(res.status).toStrictEqual(constants.HTTP_STATUS_BAD_REQUEST);
      },
    });
  });
});
