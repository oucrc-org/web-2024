import { ReactNode } from 'react';
import OneColumnLayout from '@/components/layout/OneColumnLayout';

export const revalidate = 3600;

/**
 * 記事一覧ページ共通レイアウト
 */
export default async function ArticleListLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <OneColumnLayout>{children}</OneColumnLayout>;
}
