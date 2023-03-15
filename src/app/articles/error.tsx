'use client';

import ErrorInfo from '@/components/ErrorInfo';
import { useEffect } from 'react';

/**
 * これは404以外のエラーで使われる
 */
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <ErrorInfo title="記事の読み込み中にエラーが発生しました">
      <button onClick={() => reset()} className="btn">
        やり直す
      </button>
    </ErrorInfo>
  );
}
