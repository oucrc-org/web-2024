import OneColumnLayout from '@/components/layout/OneColumnLayout';
import { ReactNode } from 'react';

/**
 * 1カラムのページ共通レイアウト
 */
export default async function OneColumnPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <OneColumnLayout>{children}</OneColumnLayout>;
}
