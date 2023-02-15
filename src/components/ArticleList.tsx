import { ARTICLE_PER_PAGE } from '@/config/const';
import { Article } from '@/types/micro-cms';
import { MicroCMSListResponse } from 'microcms-js-sdk';
import Link from 'next/link';
import Pagination, { PaginationProps } from './Pagination';

interface ArticleListProps {
  paginationPath: string;
  page: number;
  data: MicroCMSListResponse<Article>;
}

const ArticleList = ({ paginationPath, page, data }: ArticleListProps) => {
  return (
    <div>
      {data.contents.map((article) => (
        <Link key={article.id} href={`/articles/${article.id}`}>
          <div>
            <h2>{article.title}</h2>
          </div>
        </Link>
      ))}
      <Pagination
        page={page}
        path={paginationPath}
        total={data.totalCount}
        perPage={ARTICLE_PER_PAGE}
      />
    </div>
  );
};

export default ArticleList;
