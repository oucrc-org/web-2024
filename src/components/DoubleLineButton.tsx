import { ComponentPropsWithoutRef } from 'react';
import { twJoin } from 'tailwind-merge';

interface DoubleLineButtonProps extends ComponentPropsWithoutRef<'div'> {
  label: string;
  hasRightArrow?: boolean;
}

export default function DoubleLineButton({
  label,
  hasRightArrow = true,
}: DoubleLineButtonProps) {
  return (
    <div
      className={twJoin([
        'relative inline-block py-2 w-48',
        'border-4 border-double border-secondary font-semibold text-secondary ',
        'transition duration-500 ease-in-out hover:scale-105',
        'disabled:cursor-not-allowed disabled:opacity-50',
      ])}
    >
      {hasRightArrow && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="absolute inset-y-0 right-0 my-auto mr-2 h-4 pt-1"
          src="/images/common/article-link.svg"
          alt="右向きの矢印"
        />
      )}
      <span className="mr-1 tracking-widest">{label}</span>
    </div>
  );
}
