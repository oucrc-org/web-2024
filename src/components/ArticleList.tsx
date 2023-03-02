import { ARTICLE_PER_PAGE } from '@/config/const';
import { Article } from '@/types/micro-cms';
import { MicroCMSListResponse } from 'microcms-js-sdk';
import { ArticleCard } from './ArticleCard';
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
    <div className="container mx-auto mb-32 px-10">
      <div className="mb-24 mt-10 pt-16 text-center lg:mx-8 xl:mx-12">
        <div className="container mx-auto">
          <HeadingH2>最新の投稿</HeadingH2>
          <div className="grid-cols-3 gap-8 sm:grid">
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
