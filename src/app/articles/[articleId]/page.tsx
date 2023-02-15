import { getAllArticles, getArticle, getArticles } from '@/utils/micro-cms';
import { Metadata } from 'next';
import { buildMetadata } from '@/utils/metadata';

export const revalidate = 600;

type Params = {
  params: { articleId: string };
};

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.contents.map(({ id }) => ({
    articleId: id,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const article = await getArticle(params.articleId);
  return buildMetadata({ title: article.title });
}

export default async function ArticlePage({ params }: Params) {
  const articleId = params.articleId;
  const article = await getArticle(articleId);

  return (
    <div>
      <pre>{JSON.stringify(article, null, '\t')}</pre>
    </div>
  );
}
