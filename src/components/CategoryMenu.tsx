import { getAllCategories } from '@/utils/micro-cms';
import Link from 'next/link';

const CategoryMenu = async () => {
  const categories = await getAllCategories();
  return (
    <div className="flex gap-4">
      {categories.contents.map((category) => (
        <Link key={category.id} href={`/articles/category/${category.id}`}>
          <div className="rounded-xl bg-gray-300 p-3 text-lg font-bold">
            {category.category}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryMenu;
