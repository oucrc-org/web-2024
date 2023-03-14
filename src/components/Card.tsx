import Link from 'next/link';
import Image from 'next/image';
import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

import DoubleLineButton from './DoubleLineButton';

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  imageSrc: string;
  href: string;
  categoryName: string;
  description: string;
}

/**
 * 旧サイトの`components/ArticleCard.vue`を移植
 */
export default function Card({
  imageSrc,
  href,
  description,
  categoryName,
  className,
  ...props
}: CardProps) {
  return (
    <div className={twMerge('bg-white text-center', className)} {...props}>
      <Link
        href={href}
        className="flex w-full flex-col items-center gap-y-3 transition duration-500 ease-in-out hover:scale-101"
      >
        <div className="relative w-full self-stretch">
          <Image
            width={346}
            height={224}
            className="h-56 w-full object-cover shadow-lg"
            src={imageSrc}
            alt={description}
          />
          <Image
            width={170}
            height={80}
            className="absolute bottom-0 right-0 h-20"
            src="/images/common/polygon.svg"
            alt="右下の光沢"
          />
          <div className="absolute left-2 top-[10px] bg-primary py-2 px-5 text-center text-sm font-bold tracking-widest text-white">
            {categoryName}
          </div>
        </div>
        <div className="mt-4 px-3 text-left text-lg font-semibold leading-8 tracking-widest text-secondary">
          <span className="block">{description}</span>
        </div>
        <DoubleLineButton>内容を見る</DoubleLineButton>
      </Link>
    </div>
  );
}
