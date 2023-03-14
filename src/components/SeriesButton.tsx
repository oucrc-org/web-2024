import { Series } from '@/types/micro-cms';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';
import { HiOutlineBookOpen } from 'react-icons/hi';
import ButtonWithIcon from './ButtonWithIcon';

interface SeriesButtonProps extends ComponentPropsWithoutRef<'div'> {
  series: Series;
}

export default function SeriesButton({ className, series }: SeriesButtonProps) {
  return (
    <Link href={`/articles/series/${series.id}`}>
      <ButtonWithIcon icon={<HiOutlineBookOpen />} className={className}>
        {series.series}
      </ButtonWithIcon>
    </Link>
  );
}
