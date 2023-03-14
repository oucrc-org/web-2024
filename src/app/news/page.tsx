import NewsList from '@/components/NewsList';
import { Suspense } from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

export const metadata = {
  title: 'お知らせ',
  description: 'OUCRC（岡山大学電子計算機研究会）のからのお知らせ一覧です！',
};

export default async function NewsIndexPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      {/* @ts-expect-error Server Component */}
      <NewsList pageNumber={1} />
    </Suspense>
  );
}
