'use client';

import ErrorInfo from '@/components/ErrorInfo';

/**
 * レイアウトで発生したエラーのハンドリング
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <head></head>
      <body>
        <ErrorInfo title="エラーが発生しました">
          <button onClick={() => reset()} className="btn-info btn">
            やり直す
          </button>
        </ErrorInfo>
      </body>
    </html>
  );
}
