import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

interface PaginationProps {
  path: string;
  pageNumber: number;
  total: number;
  perPage: number;
}

/**
 * ページ送り
 * メニュー上でカーソルを動かしただけで通信してしまうため、プリフェッチ無効化
 */
export default function Pagination({
  path,
  pageNumber,
  total,
  perPage,
}: PaginationProps) {
  const getArrayJumpTo = (totalCount: number, countPerPage: number) => {
    return Array.from(Array(Math.ceil(totalCount / countPerPage)).keys()).map(
      (i) => i + 1
    );
  };
  return (
    <div className="mx-auto">
      <div className="btn-group flex-wrap">
        {pageNumber > 1 && (
          <Link href={`${path}/${pageNumber - 1}`} className="btn-md btn">
            {`«`}
          </Link>
        )}
        {getArrayJumpTo(total, perPage).map((p) => (
          <Link
            key={p}
            href={`${path}/${p}`}
            className={twJoin('btn btn-md', pageNumber === p && 'btn-active')}
          >
            {p}
          </Link>
        ))}
        {pageNumber < Math.ceil(total / perPage) && (
          <Link href={`${path}/${pageNumber + 1}`} className="btn-md btn">
            {`»`}
          </Link>
        )}
      </div>
    </div>
  );
}
