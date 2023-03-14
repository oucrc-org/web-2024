import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

interface PaginationProps {
  path: string;
  pageNumber: number;
  total: number;
  perPage: number;
}

const Pagination = ({ path, pageNumber, total, perPage }: PaginationProps) => {
  const getArrayJumpTo = (totalCount: number, countPerPage: number) => {
    return Array.from(Array(Math.ceil(totalCount / countPerPage)).keys()).map(
      (i) => i + 1
    );
  };
  return (
    <div className="mx-auto pt-2 pb-16">
      <div className="btn-group flex-wrap">
        {pageNumber > 1 && (
          <Link href={`${path}/p/${pageNumber - 1}`} className="btn-md btn">
            {`«`}
          </Link>
        )}
        {getArrayJumpTo(total, perPage).map((p) => (
          <Link
            key={p}
            href={`${path}/p/${p}`}
            className={twJoin('btn btn-md', pageNumber === p && 'btn-active')}
          >
            {p}
          </Link>
        ))}
        {pageNumber < Math.ceil(total / perPage) && (
          <Link href={`${path}/p/${pageNumber + 1}`} className="btn-md btn">
            {`»`}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
