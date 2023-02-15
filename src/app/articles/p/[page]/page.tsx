import { getAllArticles, getArticles } from '@/utils/micro-cms';
import { Metadata } from 'next';
import { buildMetadata } from '@/utils/metadata';
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

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return buildMetadata({ title: `記事一覧 ${params.page}ページ目` });
}

export default async function ArticlePage({
  params,
}: {
  params: {
    page?: string;
  };
}) {
  const page = params.page ? Number(params.page) : 1;
  const articles = await getArticles(page);

  return (
    <ArticleList data={articles} page={page} paginationPath={`/articles`} />
  );
}
