import { getAllArticles, getArticles } from '@/utils/micro-cms';
import { Metadata } from 'next';
import ArticleList from '@/components/ArticleList';
import { ARTICLE_PER_PAGE } from '@/config/const';

export const revalidate = 600;

type Params = {
  params: { page: string };
};

export async function generateStaticParams() {
  const articles = await getAllArticles();
  // 必要なページ数を計算
  const pages = Math.ceil(articles.contents.length / ARTICLE_PER_PAGE);
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

export default async function ArticlePage({
  params: { page },
}: {
  params: {
    page?: string;
  };
}) {
  const pageNumber = page ? Number(page) : 1;
  const articles = await getArticles(pageNumber);

  return (
    <ArticleList
      data={articles}
      pageNumber={pageNumber}
      paginationPath={`/articles`}
    />
  );
}
