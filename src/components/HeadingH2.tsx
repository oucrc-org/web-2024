import { ReactNode } from 'react';

interface HeadingH2Props {
  children: ReactNode;
}

/**
 * 旧サイトの`components/Title.vue`を移植
 */
export default function HeadingH2({ children }: HeadingH2Props) {
  return (
    <h2 className="text-center">
      <div className="relative text-center text-xl font-semibold tracking-widest text-black">
        {children}
      </div>
      <div className="inline-block w-12 border-t-4 border-double border-black" />
    </h2>
  );
}
