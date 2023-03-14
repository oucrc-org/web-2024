import { getAllCategories, getArticles, getCategory } from '@/utils/micro-cms';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleList from '@/components/ArticleList';

export const revalidate = 600;

type Params = {
  params: { categoryId: string };
};

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.contents.map(({ id }) => ({
    categoryId: id,
  }));
}

export async function generateMetadata({
  params: { categoryId },
}: Params): Promise<Metadata | void> {
  const category = await getCategory(categoryId);
  if (category) {
    return { title: `${category.category}の記事一覧` };
  }
}

export default async function ArticleCategoryIndexPage({
  params: { categoryId },
}: Params) {
  const articles = await getArticles(1, {
    categoryId,
  });
  if (articles.contents.length === 0) {
    notFound();
  }

  return (
    <>
      <ArticleList
        data={articles}
        pageNumber={1}
        paginationPath={`/articles/category/${categoryId}`}
      />
    </>
  );
}
