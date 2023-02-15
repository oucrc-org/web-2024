import Link from 'next/link';

interface PaginationProps {
  path: string;
  page: number;
  total: number;
  perPage: number;
}

const Pagination = ({ path, page, total, perPage }: PaginationProps) => {
  const getArrayJumpTo = (totalCount: number, countPerPage: number) => {
    return Array.from(Array(Math.ceil(totalCount / countPerPage)).keys()).map(
      (i) => i + 1
    );
  };
  return (
    <div className="mx-auto my-2 flex flex-row justify-center gap-x-3">
      {page > 1 && (
        <Link href={`${path}/p/${page - 1}`}>
          <div className="text-xl text-subtext">&lt;</div>
        </Link>
      )}
      {getArrayJumpTo(total, perPage).map((p) => (
        <Link key={p} href={`${path}/p/${p}`}>
          <div
            className={`text-xl ${
              page === p ? 'text-primary' : 'text-subtext'
            }`}
          >
            {p}
          </div>
        </Link>
      ))}
      {page < Math.ceil(total / perPage) && (
        <Link href={`${path}/p/${page + 1}`}>
          <div className="text-xl text-subtext">&gt;</div>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
