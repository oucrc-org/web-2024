import { getAllCategories } from '@/utils/micro-cms';
import CategoryButton from './CategoryButton';
import HeadingH2 from './HeadingH2';

interface CategoryMenuProps {
  currentCategoryId?: string;
}

export default async function CategoryMenu({
  currentCategoryId,
}: CategoryMenuProps) {
  const categories = await getAllCategories();
  return (
    <>
      <div className="flex flex-col gap-y-3">
        <HeadingH2>カテゴリー</HeadingH2>
        <div className="flex flex-wrap gap-2">
          {categories.contents.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              className={currentCategoryId === category.id ? 'btn-active' : ''}
            />
          ))}
        </div>
      </div>
    </>
  );
}
