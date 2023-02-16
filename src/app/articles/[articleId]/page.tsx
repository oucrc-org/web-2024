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
  const { title, body, twitter_comment, image } = await getArticle(articleId);
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

export default async function ArticlePage({ params: { articleId } }: Params) {
  const { title } = await getArticle(articleId);

  return <div>{title}</div>;
}
