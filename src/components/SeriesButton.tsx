import { Series } from '@/types/micro-cms';
import Link from 'next/link';
import { HiOutlineBookOpen } from 'react-icons/hi';

interface SeriesButtonProps {
  series: Series;
}

export default function SeriesButton({ series }: SeriesButtonProps) {
  return (
    <Link
      href={`/articles/series/${series.id}`}
      className="inline-block rounded-lg bg-blockquote px-4 pb-2"
    >
      <span className="inline-block h-6 w-6">
        <HiOutlineBookOpen />
      </span>
      <span className="inline-block pl-2 pt-2 align-top text-sm text-secondary">
        {series.series}
      </span>
    </Link>
  );
}
