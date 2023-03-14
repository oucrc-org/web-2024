import { formatDate } from '@/utils/date';
import Image from 'next/image';
import { News } from '@/types/micro-cms';

interface NewsContentProps {
  news: News;
}

/**
 * 旧サイトの`components/ArticleContent.vue`を移植してお知らせに対応
 */
export default function NewsContent({ news }: NewsContentProps) {
  return (
    <section className="flex flex-col gap-y-6 bg-white pb-20 lg:shadow-xl">
      {news.image ? (
        <Image
          src={news.image.url}
          // 不定のため適当
          width={800}
          height={450}
          className="w-full"
          alt="トップ画像"
        />
      ) : (
        <Image
          src="/images/news/cover.jpg"
          // 画像ファイルの1/4サイズ
          width={961}
          height={595}
          className="m-auto block w-full"
          alt="トップ画像"
        />
      )}
      <div className="mx-8 mt-6 text-4xl font-bold tracking-wider sm:mx-16 sm:text-5xl">
        {news.title.replace(/　/g, ' ')}
      </div>
      <div className="mx-8 mb-8 mt-6 sm:mx-16">
        <div className="tracking-widest text-secondary sm:text-lg">
          最終更新: {formatDate(news.updatedAt)}
        </div>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: news.body }}
        className="prose mt-16 block w-full max-w-none px-8 text-lg leading-8 tracking-wider sm:px-16"
      ></div>
    </section>
  );
}
