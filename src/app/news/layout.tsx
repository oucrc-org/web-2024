import { ReactNode } from 'react';

/**
 * お知らせページ共通レイアウト
 */
export default async function NewsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <div className="container mx-auto mb-32 grow px-2 sm:px-4 md:px-10">
        <div className="container mx-auto flex flex-col gap-y-6 pt-8">
          {children}
        </div>
      </div>
    </>
  );
}
