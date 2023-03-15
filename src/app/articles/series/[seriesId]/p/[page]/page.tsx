import {
  getAllArticles,
  getAllSerieses,
  getArticles,
  getSeries,
} from '@/utils/micro-cms';
import { Metadata } from 'next';
import ArticleList from '@/components/ArticleList';
import { clientEnv } from '@/utils/client-env';
import { notFound } from 'next/navigation';

export const revalidate = 600;

type Params = {
  params: { seriesId: string; page: string };
};

export async function generateStaticParams() {
  const serieses = await getAllSerieses();
  const paths = await Promise.all(
    serieses.contents
      .map(async ({ id: seriesId }) => {
        return await getAllArticles({ seriesId }).then((articles) => {
          // 必要なページ数を計算
          const pages = Math.ceil(
            articles.contents.length / clientEnv.ARTICLE_COUNT_PER_PAGE
          );
          return Array.from({ length: pages }, (_, i) =>
            (i + 1).toString()
          ).map((page) => ({
            seriesId,
            page,
          }));
        });
      })
      .flat(1)
  );
  return paths.flat(1);
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata | void> {
  const series = await getSeries(params.seriesId);
  if (series) {
    return {
      title: `${series.series}の記事一覧 ${params.page}ページ目`,
    };
  }
}

export default async function ArticleSeriesIndexPage({
  params: { seriesId, page },
}: Params) {
  const pageNumber = page ? Number(page) : 1;
  const articles = await getArticles(pageNumber, {
    seriesId,
  });
  if (articles.contents.length === 0) {
    notFound();
  }
  return (
    <ArticleList
      data={articles}
      pageNumber={pageNumber}
      paginationPath={`/articles/series/${seriesId}`}
    />
  );
}
