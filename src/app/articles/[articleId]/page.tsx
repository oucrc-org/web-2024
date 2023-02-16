import { getAllArticles, getArticle } from '@/utils/micro-cms';
import { Metadata } from 'next';

export const revalidate = 600;

type Params = {
  params: { articleId: string };
};

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.contents.map(({ id: articleId }) => ({
    articleId,
  }));
}

export async function generateMetadata({
  params: { articleId },
}: Params): Promise<Metadata> {
  const { title } = await getArticle(articleId);
  return { title };
}

export default async function ArticlePage({ params: { articleId } }: Params) {
  const { title } = await getArticle(articleId);

  return <div>{title}</div>;
}
