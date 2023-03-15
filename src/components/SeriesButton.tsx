import Link, { LinkProps } from 'next/link';
import { ComponentPropsWithoutRef } from 'react';
import { Series } from '@/types/micro-cms';
import { HiOutlineBookOpen } from 'react-icons/hi';
import ButtonWithIcon from './ButtonWithIcon';

interface SeriesButtonProps extends ComponentPropsWithoutRef<'div'> {
  series: Series;
  prefetch?: LinkProps['prefetch'];
}

export default function SeriesButton({
  className,
  series,
  prefetch,
}: SeriesButtonProps) {
  return (
    <Link href={`/articles/series/${series.id}`} prefetch={prefetch}>
      <ButtonWithIcon icon={<HiOutlineBookOpen />} className={className}>
        {series.series}
      </ButtonWithIcon>
    </Link>
  );
}
