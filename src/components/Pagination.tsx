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
    <div className="btn btn-group mx-auto my-2">
      {pageNumber > 1 && (
        <Link href={`${path}/p/${pageNumber - 1}`}>
          <div className="btn btn-md">&lt;</div>
        </Link>
      )}
      {getArrayJumpTo(total, perPage).map((p) => (
        <Link key={p} href={`${path}/p/${p}`}>
          <div
            className={twJoin('btn btn-md', pageNumber === p && 'btn-active')}
          >
            {p}
          </div>
        </Link>
      ))}
      {pageNumber < Math.ceil(total / perPage) && (
        <Link href={`${path}/p/${pageNumber + 1}`}>
          <div className="btn btn-md">&gt;</div>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
