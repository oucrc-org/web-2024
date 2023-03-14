import { getAllSerieses, getArticles, getSeries } from '@/utils/micro-cms';
import { Metadata } from 'next';
import ArticleList from '@/components/ArticleList';

export const revalidate = 600;

type Params = {
  params: { seriesId: string };
};

export async function generateStaticParams() {
  const serieses = await getAllSerieses();
  return serieses.contents.map(({ id }) => ({
    seriesId: id,
  }));
}

export async function generateMetadata({
  params: { seriesId },
}: Params): Promise<Metadata> {
  const series = await getSeries(seriesId);
  return { title: `${series.series}の記事一覧` };
}

export default async function ArticlePage({ params: { seriesId } }: Params) {
  const articles = await getArticles(1, {
    seriesId,
  });

  return (
    <>
      <ArticleList
        data={articles}
        pageNumber={1}
        paginationPath={`/articles/series/${seriesId}`}
      />
    </>
  );
}
