import CategoryMenu from '@/components/CategoryMenu';
import SeriesMenu from '@/components/SeriesMenu';
import { Suspense, ReactNode } from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

/**
 * 記事一覧ページネーションページ共通レイアウト
 */
export default async function ArticleListPaginationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <CategoryMenu />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <SeriesMenu />
      </Suspense>
      <div className="flex flex-col gap-y-6 pt-8">{children}</div>
    </>
  );
}
