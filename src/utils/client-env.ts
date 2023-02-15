import { envsafe, str } from 'envsafe';

/**
 * クライアントサイドで使用可能な環境変数
 */
export const clientEnv = envsafe({
  GTAG_ID: str({ input: process.env.NEXT_PUBLIC_GTAG_ID }),
});
