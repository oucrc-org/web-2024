import { getAllSerieses, getArticles, getSeries } from '@/utils/micro-cms';
import { Metadata } from 'next';
import ArticleList from '@/components/ArticleList';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

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
}: Params): Promise<Metadata | void> {
  const series = await getSeries(seriesId);
  if (series) {
    return { title: `${series.series}の記事一覧` };
  }
}

export default async function ArticleSeriesIndexPage({
  params: { seriesId },
}: Params) {
  const articles = await getArticles(1, {
    seriesId,
  });
  if (!articles || articles.contents.length === 0) {
    notFound();
  }
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
