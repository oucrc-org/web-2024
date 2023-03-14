import { getAllArticleIds, getArticles } from '@/utils/micro-cms';
import { Metadata } from 'next';
import ArticleList from '@/components/ArticleList';
import { clientEnv } from '@/config/client-env';
import { notFound } from 'next/navigation';

type Params = {
  params: { page: string };
};

export async function generateStaticParams() {
  const articles = await getAllArticleIds();
  // 必要なページ数を計算
  const pages = articles
    ? Math.ceil(articles.contents.length / clientEnv.ARTICLE_COUNT_PER_PAGE)
    : 0;
  return Array.from({ length: pages }, (_, i) => (i + 1).toString()).map(
    (page) => ({
      page,
    })
  );
}

export async function generateMetadata({
  params: { page },
}: Params): Promise<Metadata> {
  return { title: `記事一覧 ${page}ページ目` };
}

export default async function ArticleIndexPage({
  params: { page },
}: {
  params: {
    page?: string;
  };
}) {
  const pageNumber = page ? Number(page) : 1;
  const articles = await getArticles(pageNumber);
  if (!articles || articles.contents.length === 0) {
    notFound();
  }
  return (
    <ArticleList
      data={articles}
      pageNumber={pageNumber}
      paginationPath={`/articles`}
    />
  );
}
