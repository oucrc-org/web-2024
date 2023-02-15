import { envsafe, str } from 'envsafe';
import { clientEnv } from './client-env';

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') {
  throw new Error(
    'Server-side environment variables are not available on browser'
  );
}

/**
 * サーバーサイドで**のみ**使用可能な環境変数
 */
export const env = {
  ...clientEnv,
  ...envsafe({
    MICROCMS_API_KEY: str({}),
    MICROCMS_SERVICE_DOMAIN: str({}),
  }),
};
