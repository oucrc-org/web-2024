import { Article } from '@/types/micro-cms';
import Link from 'next/link';
import Image from 'next/image';
import DoubleLineButton from './DoubleLineButton';
import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ArticleCardProps extends ComponentPropsWithoutRef<'div'> {
  article: Article;
}

/**
 * 旧サイトの`components/ArticleCard.vue`を移植
 */
export default function ArticleCard({
  article,
  className,
  ...props
}: ArticleCardProps) {
  return (
    <div className={twMerge('text-center', className)} {...props}>
      <Link
        href={`/articles/${article.id}`}
        className="flex h-full w-full flex-col items-center gap-y-3 transition duration-500 ease-in-out hover:scale-101"
      >
        <div className="flex w-full grow flex-col gap-y-5 self-stretch">
          <div className="relative w-full">
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
          <h2 className="whitespace-no-wrap overflow-hidden text-ellipsis px-3 text-left text-2xl font-semibold leading-8 tracking-widest text-primary">
            {article.title}
          </h2>
          {/* descriptionに相当するフィールドがないため使用 長い場合はline-clampで省略 */}
          <div className="px-3 text-left text-lg font-semibold leading-8 tracking-widest text-secondary line-clamp-3">
            {article.twitter_comment}
          </div>
        </div>
        <div className="grow-0">
          <DoubleLineButton>内容を見る</DoubleLineButton>
        </div>
      </Link>
    </div>
  );
}
