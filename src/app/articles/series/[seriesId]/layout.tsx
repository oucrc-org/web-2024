import CategoryMenu from '@/components/CategoryMenu';
import SeriesMenu from '@/components/SeriesMenu';
import { ReactNode } from 'react';

/**
 * シリーズページ共通レイアウト
 */
export default async function CategoryLayout({
  children,
  params: { seriesId },
}: {
  children: ReactNode;
  params: {
    seriesId: string;
  };
}) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <CategoryMenu />
      {/* @ts-expect-error Server Component */}
      <SeriesMenu currentSeriesId={seriesId} />
      {children}
    </>
  );
}
