import type { ReactElement } from 'react';
import type { NextPage } from 'next';

/**
 * getLayoutパターンを実装するために必要
 * @see https://nextjs.org/docs/basic-features/layouts#with-typescript
 */
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // getLayout?: (page: ReactElement) => ReactNode;
  // ReactNodeだと、`withTRPC` の型と合わない
  getLayout?: (page: ReactElement) => ReactElement;
};
