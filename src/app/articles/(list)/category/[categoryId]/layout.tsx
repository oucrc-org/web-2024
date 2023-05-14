import CategoryMenu from '@/components/CategoryMenu';
import SeriesMenu from '@/components/SeriesMenu';
import { Suspense, ReactNode } from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

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
      <Suspense fallback={<LoadingSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <CategoryMenu currentCategoryId={categoryId} />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <SeriesMenu />
      </Suspense>
      {children}
    </>
  );
}
