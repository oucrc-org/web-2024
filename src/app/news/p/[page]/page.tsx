import { getAllNewses, getNewses } from '@/utils/micro-cms';
import { Metadata } from 'next';
import NewsList from '@/components/NewsList';
import { clientEnv } from '@/utils/client-env';

export const revalidate = 600;

type Params = {
  params: { page: string };
};

export async function generateStaticParams() {
  const newses = await getAllNewses();
  // 必要なページ数を計算
  const pages = Math.ceil(
    newses.contents.length / clientEnv.ARTICLE_COUNT_PER_PAGE
  );
  return Array.from({ length: pages }, (_, i) => (i + 1).toString()).map(
    (page) => ({
      page,
    })
  );
}

export async function generateMetadata({
  params: { page },
}: Params): Promise<Metadata> {
  return { title: `お知らせ一覧 ${page}ページ目` };
}

export default async function NewsIndexPage({
  params: { page },
}: {
  params: {
    page?: string;
  };
}) {
  const pageNumber = page ? Number(page) : 1;
  const newses = await getNewses(pageNumber);

  return <NewsList data={newses} pageNumber={pageNumber} />;
}
