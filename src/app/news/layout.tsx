import Container from '@/components/Container';
import { ReactNode } from 'react';

/**
 * お知らせページ共通レイアウト
 */
export default async function NewsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
}
