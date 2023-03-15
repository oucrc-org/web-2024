import { clientEnv } from '@/config/client-env';
import HeadingH2 from './HeadingH2';
import NewsCard from './NewsCard';
import Pagination from './Pagination';
import { getNewses } from '@/utils/micro-cms';

interface NewsListProps {
  pageNumber: number;
  enablePagination?: boolean;
}

export default async function NewsList({
  pageNumber,
  enablePagination = true,
}: NewsListProps) {
  const data = await getNewses(pageNumber);
  if (data) {
    return (
      <>
        <HeadingH2>最新のお知らせ</HeadingH2>
        <div className="flex flex-col divide-y divide-gray-300">
          {data.contents.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))}
        </div>
        {enablePagination && (
          <Pagination
            pageNumber={pageNumber}
            path="/news/p" // articles, newsは`/p`がある
            total={data.totalCount}
            perPage={clientEnv.ARTICLE_COUNT_PER_PAGE}
          />
        )}
      </>
    );
  }
  return null;
}
