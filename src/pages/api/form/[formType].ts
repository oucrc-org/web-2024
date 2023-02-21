import { FORMS } from '@/config/form';
import { allowOnlyPostingObjectBody } from '@/utils/api';
import { postToGoogleForm } from '@/utils/form';
import { constants } from 'http2';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Googleフォームとの通信を担うAPIルート
 * POST: JSONを投げると[formType]に応じて送信
 * POST以外: [formType]に応じてフォームページに転送
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /**
   * `contact` OR `join`
   * 複数指定は不可能なのでstring
   */
  const formType = req.query.formType as string;
  if (Object.keys(FORMS).includes(formType)) {
    const config = FORMS[formType as keyof typeof FORMS];
    return await allowOnlyPostingObjectBody(
      req,
      res,
      async (body) => {
        return await postToGoogleForm(config, body)
          .then(() => {
            return res
              .status(constants.HTTP_STATUS_OK)
              .json({ message: 'Contact form sent' });
          })
          .catch((e) => {
            console.log(e);
            return res
              .status(e ?? constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
              .json({ message: e.message ?? e });
          });
      },
      // POSTでない場合はフォーム自体へリダイレクト
      async () => {
        // `writeHead`だと転送できない
        // TODO: `ERR_HTTP_HEADERS_SENT`エラー対応
        res.redirect(
          `https://docs.google.com/forms/d/e/${config.formId}/viewform`
        );
      }
    );
  } else {
    return res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .json({ message: 'Not found' });
  }
}
