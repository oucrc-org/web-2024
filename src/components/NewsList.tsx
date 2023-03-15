import { MicroCMSListResponse } from 'microcms-js-sdk';
import { clientEnv } from '@/config/client-env';
import { News } from '@/types/micro-cms';
import HeadingH2 from './HeadingH2';
import NewsCard from './NewsCard';
import Pagination from './Pagination';

interface NewsListProps {
  pageNumber: number;
  data: MicroCMSListResponse<News> | null;
  enablePagination?: boolean;
}

export default function NewsList({
  pageNumber,
  data,
  enablePagination = true,
}: NewsListProps) {
  if (data) {
    return (
      <div className="container mx-auto px-10">
        <div className="mt-10 pt-16 text-center lg:mx-8 xl:mx-12">
          <div className="container mx-auto">
            <HeadingH2>最新のお知らせ</HeadingH2>
            <div className="flex flex-col divide-y divide-gray-300">
              {data.contents.map((news, index) => (
                <NewsCard key={index} news={news} />
              ))}
            </div>
            {enablePagination && (
              <Pagination
                pageNumber={pageNumber}
                path="/news"
                total={data.totalCount}
                perPage={clientEnv.ARTICLE_COUNT_PER_PAGE}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
}
