import { getAllCategories, getArticles, getCategory } from '@/utils/micro-cms';
import { Metadata } from 'next';
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
}: Params): Promise<Metadata> {
  const category = await getCategory(categoryId);
  return { title: `${category.category}の記事一覧` };
}

export default async function ArticlePage({ params: { categoryId } }: Params) {
  const articles = await getArticles(1, {
    categoryId,
  });

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
