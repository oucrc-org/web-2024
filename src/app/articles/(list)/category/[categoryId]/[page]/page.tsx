import {
  getAllArticleIds,
  getAllCategories,
  getArticles,
  getCategory,
} from '@/utils/micro-cms';
import { Metadata } from 'next';
import ArticleList from '@/components/ArticleList';
import { clientEnv } from '@/config/client-env';
import { notFound } from 'next/navigation';

type Params = {
  params: { categoryId: string; page: string };
};

export async function generateStaticParams() {
  const categories = await getAllCategories();
  const paths = await Promise.all(
    categories.contents
      .map(async ({ id: categoryId }) => {
        return await getAllArticleIds({ categoryId }).then((articles) => {
          // 必要なページ数を計算
          const pages = articles
            ? Math.ceil(
                articles.contents.length / clientEnv.ARTICLE_COUNT_PER_PAGE
              )
            : 1;
          return Array.from({ length: pages }, (_, i) =>
            (i + 1).toString()
          ).map((page) => ({
            categoryId,
            page,
          }));
        });
      })
      .flat(1)
  );
  return paths.flat(1);
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata | void> {
  const category = await getCategory(params.categoryId);
  if (category) {
    return {
      title: `${category.category}の記事一覧 ${params.page}ページ目`,
    };
  }
}

export default async function ArticleCategoryIndexPage({
  params: { categoryId, page },
}: Params) {
  const pageNumber = page ? Number(page) : 1;
  const articles = await getArticles(pageNumber, {
    categoryId,
  });
  if (!articles || articles?.contents.length === 0) {
    notFound();
  }

  return (
    <ArticleList
      data={articles}
      pageNumber={pageNumber}
      paginationPath={`/articles/category/${categoryId}`}
    />
  );
}
