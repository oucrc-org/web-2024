import { News } from '@/types/micro-cms';
import Link from 'next/link';
import DoubleLineButton from './DoubleLineButton';
import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { formatDate } from '@/utils/date';
interface NewsCardProps extends ComponentPropsWithoutRef<'div'> {
  news: News;
}

export default function NewsCard({ news, className, ...props }: NewsCardProps) {
  const date = news.date ?? news.createdAt;
  return (
    <div className={twMerge('bg-white', className)} {...props}>
      <Link href={`/news/${news.id}`}>
        <div className="flex items-center justify-between p-3 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            {date && (
              <div className="badge-outline badge">
                {formatDate(date.toString())}
              </div>
            )}
            <h2 className="text-left leading-8 tracking-widest text-primary">
              {news.title}
            </h2>
          </div>
          <span className="text-xs text-gray-600">▶</span>
        </div>
      </Link>
    </div>
  );
}
