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
      <div className="flex flex-col gap-y-3 px-6 sm:px-0">
        <HeadingH2>カテゴリー</HeadingH2>
        <div className="flex flex-wrap gap-2">
          {categories.contents.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              className={currentCategoryId === category.id ? 'btn-active' : ''}
              prefetch={false} // メニュー上でカーソルを動かしただけで通信してしまうため、プリフェッチ無効化
            />
          ))}
        </div>
      </div>
    </>
  );
}
