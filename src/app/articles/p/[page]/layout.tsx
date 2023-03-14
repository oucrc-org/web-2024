import CategoryMenu from '@/components/CategoryMenu';
import SeriesMenu from '@/components/SeriesMenu';
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
    <>
      {/* @ts-expect-error Server Component */}
      <CategoryMenu />
      {/* @ts-expect-error Server Component */}
      <SeriesMenu />
      <div className="flex flex-col gap-y-6 pt-8">{children}</div>
    </>
  );
}
