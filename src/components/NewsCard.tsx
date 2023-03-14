import { News } from '@/types/micro-cms';
import Link from 'next/link';
import DoubleLineButton from './DoubleLineButton';
import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';
interface NewsCardProps extends ComponentPropsWithoutRef<'div'> {
  news: News;
}

export default function NewsCard({ news, className, ...props }: NewsCardProps) {
  return (
    <div className={twMerge('bg-white', className)} {...props}>
      <Link href={`/news/${news.id}`}>
        <h2 className="p-3 text-left leading-8 tracking-widest text-primary">
          {news.title}
        </h2>
      </Link>
    </div>
  );
}
