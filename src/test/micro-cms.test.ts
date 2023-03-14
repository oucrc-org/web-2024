import { clientEnv } from '@/utils/client-env';
import { getPastTermYears } from '@/utils/micro-cms';

describe('microCMS関連の動作確認', () => {
  test('環境変数で指定した年度の配列を生成できるか', () => {
    const array = getPastTermYears();
    console.info('Latest term years: ', array);
    expect(array.length).toStrictEqual(clientEnv.MAX_MEMBER_YEARS);
  });
});
