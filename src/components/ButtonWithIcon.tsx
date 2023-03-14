import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonWithIconProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  icon: ReactNode;
}
export default function ButtonWithIcon({
  className,
  children,
  icon,
}: ButtonWithIconProps) {
  return (
    <div className={twMerge('btn btn-primary gap-2', className)}>
      <span className="text-black">{icon}</span>
      <span className="max-w-[220px] truncate">{children}</span>
    </div>
  );
}
