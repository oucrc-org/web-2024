import OneColumnLayout from '@/components/layout/OneColumnLayout';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import NewsContent from '@/components/NewsContent';
import { getAllNewsIds, getNews } from '@/utils/micro-cms';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 600;

type Params = {
  params: { newsId: string };
};

export async function generateStaticParams() {
  const newses = await getAllNewsIds();
  return newses.contents.map(({ id: newsId }) => ({
    newsId,
  }));
}

export async function generateMetadata({
  params: { newsId },
}: Params): Promise<Metadata | void> {
  const news = await getNews(newsId);
  if (news) {
    const { title, body, image } = news;
    const description = body.slice(0, 140);
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

export default async function NewsPage({ params: { newsId } }: Params) {
  const news = await getNews(newsId);
  if (!news) {
    notFound();
  }
  return (
    <OneColumnLayout>
      <NewsContent news={news} />;
    </OneColumnLayout>
  );
}
