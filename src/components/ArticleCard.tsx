import { Article } from '@/types/micro-cms';
import Link from 'next/link';
import Image from 'next/image';
import DoubleLineButton from './DoubleLineButton';
import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { HiOutlineBookOpen } from 'react-icons/hi';

interface ArticleCardProps extends ComponentPropsWithoutRef<'div'> {
  article: Article;
}

/**
 * 旧サイトの`components/ArticleCard.vue`を移植
 */
export function ArticleCard({
  article,
  className,
  ...props
}: ArticleCardProps) {
  return (
    <div className={twMerge('bg-white text-center', className)} {...props}>
      <Link
        href={`/articles/${article.id}`}
        className="inline-block w-full transition duration-500 ease-in-out hover:scale-101"
      >
        <div className="relative">
          {article.image ? (
            <Image
              width={346}
              height={224}
              className="h-56 w-full object-cover shadow-lg"
              src={article.image.url}
              alt={article.title}
            />
          ) : (
            <Image
              width={346}
              height={224}
              className="h-56 w-full object-cover shadow-lg"
              src="/images/article/cover.jpg"
              alt="NoImage"
            />
          )}

          <Image
            width={170}
            height={80}
            className="absolute bottom-0 right-0 h-20"
            src="/images/common/polygon.svg"
            alt="右下の光沢"
          />
          {article.category && (
            <div className="absolute left-2 top-[10px] bg-primary py-2 px-5 text-center text-sm font-bold tracking-widest text-white">
              {article.category.category}
            </div>
          )}
        </div>
        <h2 className="whitespace-no-wrap mt-6 overflow-hidden text-ellipsis px-3 text-left text-2xl font-semibold leading-8 tracking-widest text-primary">
          {article.title}
        </h2>
        <div className="mt-4 px-3 text-left text-lg font-semibold leading-8 tracking-widest text-secondary">
          <span className="block">{article.twitter_comment}</span>
        </div>
        {article.series && (
          <div className="mt-3 text-left">
            <Link
              href={`/articles/series/${article.series.id}`}
              className="mb-3 mr-4 inline-block rounded-lg bg-blockquote px-4 pb-2 transition duration-500 ease-in-out hover:scale-105"
            >
              <span className="inline-block h-6 w-6">
                <HiOutlineBookOpen />
              </span>
              <span className="inline-block pl-2 pt-2 align-top text-sm text-secondary">
                {article.series.series}
              </span>
            </Link>
          </div>
        )}
        <DoubleLineButton label="内容を見る" className="mt-4" />
      </Link>
    </div>
  );
}
