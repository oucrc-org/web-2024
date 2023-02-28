import CategoryMenu from '@/components/CategoryMenu';
import { ReactNode } from 'react';

/**
 * カテゴリページ共通レイアウト
 */
export default async function CategoryLayout({
  children,
  params: { categoryId },
}: {
  children: ReactNode;
  params: {
    categoryId: string;
  };
}) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <CategoryMenu currentCategoryId={categoryId} />
      {children}
    </>
  );
}
