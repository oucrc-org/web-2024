import { getAllCategories, getArticles, getCategory } from '@/utils/micro-cms';
import { Metadata } from 'next';
import { buildMetadata } from '@/utils/metadata';
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

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const category = await getCategory(params.categoryId);
  return buildMetadata({ title: `${category.category}の記事一覧` });
}

export default async function ArticlePage({ params }: Params) {
  const categoryId = params.categoryId;
  const articles = await getArticles(1, {
    categoryId: params.categoryId,
  });

  return (
    <ArticleList
      data={articles}
      page={1}
      paginationPath={`/articles/category/${categoryId}`}
    />
  );
}
