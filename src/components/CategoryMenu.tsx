import { getAllCategories } from '@/utils/micro-cms';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { twJoin } from 'tailwind-merge';

interface CategoryMenuProps {
  currentCategoryId?: string;
}

const CategoryMenu = async ({ currentCategoryId }: CategoryMenuProps) => {
  const categories = await getAllCategories();
  return (
    <div className="tabs">
      {categories.contents.map((category) => (
        <Link key={category.id} href={`/articles/category/${category.id}`}>
          <div
            className={twJoin(
              'tab tab-lg tab-lifted',
              currentCategoryId === category.id && 'tab-active'
            )}
          >
            {category.category}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryMenu;
