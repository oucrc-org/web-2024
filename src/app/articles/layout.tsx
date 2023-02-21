import { ReactNode } from 'react';

/**
 * 記事ページ共通レイアウト
 */
export default async function ArticleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="flex flex-col gap-y-6 pt-8">{children}</div>;
}
