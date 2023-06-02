import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  generateArticleMetadata,
  getAllArticleIds,
  getArticle,
} from '@/utils/micro-cms';
import ArticleContent from '@/components/ArticleContent';

type Params = {
  params: { articleId: string };
};

export async function generateStaticParams() {
  const articles = await getAllArticleIds();
  return articles.contents.map(({ id: articleId }) => ({
    articleId,
  }));
}

export async function generateMetadata({
  params: { articleId },
}: Params): Promise<Metadata | void> {
  return await generateArticleMetadata(articleId);
}

export default async function ArticlePage({ params: { articleId } }: Params) {
  const article = await getArticle(articleId);
  if (!article) {
    notFound();
  }
  return <ArticleContent article={article} />;
}
