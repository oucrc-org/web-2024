import Container from '@/components/Container';
import { ReactNode } from 'react';

export const revalidate = 3600;

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
