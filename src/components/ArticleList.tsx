import { ARTICLE_PER_PAGE } from '@/config/const';
import { Article } from '@/types/micro-cms';
import { MicroCMSListResponse } from 'microcms-js-sdk';
import ArticleCard from './ArticleCard';
import HeadingH2 from './HeadingH2';
import Pagination from './Pagination';

interface ArticleListProps {
  paginationPath: string;
  pageNumber: number;
  data: MicroCMSListResponse<Article>;
}

const ArticleList = ({
  paginationPath,
  pageNumber,
  data,
}: ArticleListProps) => {
  return (
    <div className="container mx-auto px-10">
      <div className="text-center lg:mx-8 xl:mx-12">
        <div className="container mx-auto flex flex-col gap-y-16">
          <HeadingH2>最新の投稿</HeadingH2>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-3">
            {data.contents.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
          <Pagination
            pageNumber={pageNumber}
            path={paginationPath}
            total={data.totalCount}
            perPage={ARTICLE_PER_PAGE}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
