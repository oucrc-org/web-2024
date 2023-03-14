import NewsContent from '@/components/NewsContent';
import { getAllNewses, getNews } from '@/utils/micro-cms';
import { Metadata } from 'next';

export const revalidate = 600;

type Params = {
  params: { newsId: string };
};

export async function generateStaticParams() {
  const newses = await getAllNewses();
  return newses.contents.map(({ id: newsId }) => ({
    newsId,
  }));
}

export async function generateMetadata({
  params: { newsId },
}: Params): Promise<Metadata> {
  const { title, body, image } = await getNews(newsId);
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

export default async function NewsPage({ params: { newsId } }: Params) {
  const news = await getNews(newsId);
  return (
    <div className="container mx-auto">
      <div className="pb-10 lg:mt-16">
        <NewsContent news={news} />
      </div>
    </div>
  );
}
