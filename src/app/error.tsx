'use client'; // Error components must be Client components

import { useEffect } from 'react';

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
    <div className="flex flex-col items-center pt-32 text-center">
      <h2>エラー</h2>
      <button onClick={() => reset()}>やり直す</button>
    </div>
  );
}
