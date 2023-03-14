import { getNewses } from '@/utils/micro-cms';
import NewsList from '@/components/NewsList';

export const revalidate = 600;

export const metadata = {
  title: 'お知らせ',
  description: 'OUCRC（岡山大学電子計算機研究会）のからのお知らせ一覧です！',
};

export default async function NewsIndexPage() {
  const articles = await getNewses(1);
  return (
    <>
      <NewsList data={articles} pageNumber={1} />
    </>
  );
}
