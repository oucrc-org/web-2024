import NewsList from '@/components/NewsList';
import { Suspense } from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

export default async function NewsIndexPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      {/* @ts-expect-error Server Component */}
      <NewsList pageNumber={1} />
    </Suspense>
  );
}
