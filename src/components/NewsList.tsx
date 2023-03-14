import { ARTICLE_PER_PAGE } from '@/config/const';
import { News } from '@/types/micro-cms';
import { MicroCMSListResponse } from 'microcms-js-sdk';
import HeadingH2 from './HeadingH2';
import NewsCard from './NewsCard';
import Pagination from './Pagination';

interface NewsListProps {
  pageNumber: number;
  data: MicroCMSListResponse<News>;
}

export default function NewsList({ pageNumber, data }: NewsListProps) {
  return (
    <div className="container mx-auto mb-32 px-10">
      <div className="mb-24 mt-10 pt-16 text-center lg:mx-8 xl:mx-12">
        <div className="container mx-auto">
          <HeadingH2>最新のお知らせ</HeadingH2>
          <div className="flex flex-col divide-y divide-gray-200">
            {data.contents.map((news, index) => (
              <NewsCard key={index} news={news} />
            ))}
          </div>
          <Pagination
            pageNumber={pageNumber}
            path="/news"
            total={data.totalCount}
            perPage={ARTICLE_PER_PAGE}
          />
        </div>
      </div>
    </div>
  );
}
