import { serverEnv } from '@/config/server-env';
import { FormConfig } from '@/types/form';

/**
 * Googleフォームのnameに合わせてデータを整形してから送信
 * @typeParam {T} zodで作ったフォーム用スキーマの型
 * @param cnfig constに書いてあるnameの対応付け
 * @param formId GoogleフォームのID
 * @param data 送信するデータ
 * @returns
 */
export async function postToGoogleForm<T extends Record<string, any>>(
  config: FormConfig<T>,
  data: T
) {
  const params = new URLSearchParams();
  Object.keys(data).forEach((key) => {
    const googleFormKey = config.nameRecord[key];
    // 注意: ここでstringifyやencodeをするな。それだけでBad Requestになる
    params.set(googleFormKey, data[key]);
  });
  if (serverEnv.GOOGLE_FORM_MOCK) {
    console.info(
      'Googleフォームモック中のため送信をスキップ。パラメータ: ',
      params
    );
  } else {
    return await fetch(
      `https://docs.google.com/forms/u/0/d/e/${config.formId}/formResponse`,
      {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      }
    )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
      })
      .catch((e) => {
        throw new Error(e);
      });
  }
}
