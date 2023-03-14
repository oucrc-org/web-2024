import { NextApiRequest, NextApiResponse } from 'next';
import { constants } from 'http2';

/**
 * JSONのPOST以外を拒否する
 * エラーハンドリングも兼ねている
 */
export async function allowOnlyPostingObjectBody(
  req: NextApiRequest,
  res: NextApiResponse,
  /** 各ルートの処理をここに書くこと */
  next: (
    /** 後続処理の都合でanyだがobject型が保証されている */
    body: any
  ) => void | Promise<void | Response>,
  /** POSTではない場合の処理 */
  executeIfNotPost?: () => void | Promise<
    void | Response | NextApiResponse<any>
  >
) {
  try {
    if (req.method !== 'POST') {
      if (executeIfNotPost) {
        return await executeIfNotPost();
      } else {
        return res
          .status(constants.HTTP_STATUS_METHOD_NOT_ALLOWED)
          .json({ message: 'Only POST is allowed' });
      }
    }
    const body = req.body;
    /**
     * なお、bodyは以下のように扱われる
     * Content-Type:application/jsonかつ
     * → JSONを送った: Objectとしてパースする
     * → JSON不正: Nextが400エラーを返す
     */
    if (typeof body !== 'object') {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        message: 'Set Content-Type as application/json and send valid JSON',
      });
    }
    return await next(body);
  } catch (e: any) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(
      // zodエラー読めるようにしている
      typeof e === 'object'
        ? { message: e.message, ...e }
        : { message: JSON.stringify(e) }
    );
  }
}
