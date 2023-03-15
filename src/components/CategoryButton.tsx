import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';
import { HiOutlineTag } from 'react-icons/hi';
import { Category } from '@/types/micro-cms';
import ButtonWithIcon from './ButtonWithIcon';

interface CategoryButtonProps extends ComponentPropsWithoutRef<'div'> {
  category: Category;
}

export default function CategoryButton({
  className,
  category,
}: CategoryButtonProps) {
  return (
    <Link href={`/articles/category/${category.id}`}>
      <ButtonWithIcon icon={<HiOutlineTag />} className={className}>
        {category.category}
      </ButtonWithIcon>
    </Link>
  );
}
