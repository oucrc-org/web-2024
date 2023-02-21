import { FORMS } from '@/config/form';
import { allowOnlyPostingObjectBody } from '@/utils/api';
import { postToGoogleForm } from '@/utils/form';
import { constants } from 'http2';
import { NextApiRequest, NextApiResponse } from 'next';

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
    return await allowOnlyPostingObjectBody(req, res, async (body) => {
      return await postToGoogleForm(FORMS[formType as keyof typeof FORMS], body)
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
    });
  } else {
    return res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .json({ message: 'Not found' });
  }
}
