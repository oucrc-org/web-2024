import Link from 'next/link';

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
    <div className="mx-auto my-2 flex flex-row justify-center gap-x-3">
      {pageNumber > 1 && (
        <Link href={`${path}/p/${pageNumber - 1}`}>
          <div className="text-xl text-subtext">&lt;</div>
        </Link>
      )}
      {getArrayJumpTo(total, perPage).map((p) => (
        <Link key={p} href={`${path}/p/${p}`}>
          <div
            className={`text-xl ${
              pageNumber === p ? 'text-primary' : 'text-subtext'
            }`}
          >
            {p}
          </div>
        </Link>
      ))}
      {pageNumber < Math.ceil(total / perPage) && (
        <Link href={`${path}/p/${pageNumber + 1}`}>
          <div className="text-xl text-subtext">&gt;</div>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
