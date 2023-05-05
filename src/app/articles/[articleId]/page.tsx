import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleContent from '@/components/ArticleContent';
import { getAllArticleIds, getArticle } from '@/utils/micro-cms';

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
  const article = await getArticle(articleId);
  if (article) {
    const { title, body, twitter_comment, image } = article;
    // TODO: twitter_commentがない場合HTMLが混入する対策
    const description = twitter_comment ?? body.slice(0, 140);
    if (image) {
      const { url, width, height } = image;
      return {
        title,
        description,
        openGraph: { images: [{ url, width, height }] },
      };
    }
    return { title, description };
  }
}

export default async function ArticlePage({ params: { articleId } }: Params) {
  const article = await getArticle(articleId);
  if (!article) {
    notFound();
  }
  return <ArticleContent article={article} />;
}
