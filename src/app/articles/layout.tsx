import Container from '@/components/Container';
import { ReactNode } from 'react';

/**
 * 記事ページ共通レイアウト
 */
export default async function ArticleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Container className="flex flex-col gap-y-6 pt-32">
      {/* ここにメニューを置くとパスパラメータによる表示の変更ができない */}
      {children}
    </Container>
  );
}
