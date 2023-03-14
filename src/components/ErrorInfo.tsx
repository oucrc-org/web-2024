import Link from 'next/link';
import { ReactNode } from 'react';

export default function ErrorInfo({
  title = 'エラー',
  children = null,
}: {
  title?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 pt-32 text-center">
      <div className="error container m-8 mx-auto bg-white text-center">
        <div className="text-5xl">{title}</div>
      </div>
      {children}
      <Link href="/" className="btn-info btn">
        ホームに戻る
      </Link>
    </div>
  );
}
