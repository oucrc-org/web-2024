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
    <div className={twMerge('btn btn-primary normal-case', className)}>
      {/* 複数行に対応させるためあえてもう一度flexで囲む */}
      <div className="flex flex-row items-center gap-2">
        <span className="grow-0 text-black">{icon}</span>
        <div className="grow text-left">{children}</div>
      </div>
    </div>
  );
}
