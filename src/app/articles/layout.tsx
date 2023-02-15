import CategoryMenu from '@/components/CategoryMenu';
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
    <div>
      {/* @ts-expect-error Server Component */}
      <CategoryMenu />
      {children}
    </div>
  );
}
