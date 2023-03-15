import Container from '@/components/Container';
import { ReactNode } from 'react';

/**
 * メンバーページ共通レイアウト
 */
export default async function MemberLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Container className="flex flex-col gap-y-6 pt-32">{children}</Container>
  );
}
