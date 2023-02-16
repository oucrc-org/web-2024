import { getArticles } from '@/utils/micro-cms';
import ArticleList from '@/components/ArticleList';

export const revalidate = 600;

export const metadata = {
  title: '記事一覧',
};

export default async function ArticlePage() {
  const articles = await getArticles(1);
  return <ArticleList data={articles} page={1} paginationPath={`/articles`} />;
}
