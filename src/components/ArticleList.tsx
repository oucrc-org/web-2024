import { MicroCMSListResponse } from 'microcms-js-sdk';
import { clientEnv } from '@/config/client-env';
import { Article } from '@/types/micro-cms';
import ArticleCard from './ArticleCard';
import HeadingH2 from './HeadingH2';
import Pagination from './Pagination';

interface ArticleListProps {
  paginationPath: string;
  pageNumber: number;
  data: MicroCMSListResponse<Article> | null;
}

export default function ArticleList({
  paginationPath,
  pageNumber,
  data,
}: ArticleListProps) {
  if (data) {
    return (
      <div className="flex flex-col gap-y-16">
        <HeadingH2>最新の投稿</HeadingH2>
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {data.contents.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
        <Pagination
          pageNumber={pageNumber}
          path={paginationPath}
          total={data.totalCount}
          perPage={clientEnv.ARTICLE_COUNT_PER_PAGE}
        />
      </div>
    );
  }
  return null;
}
