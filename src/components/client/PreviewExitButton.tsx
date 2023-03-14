import Link from 'next/link';

export default function PreviewExitButton() {
  return (
    <Link
      prefetch={false} // プリフェッチされると予期しない挙動になる
      href="/api/preview"
      className="btn-primary btn-lg btn fixed right-3 top-3 z-50"
    >
      プレビューを終了
    </Link>
  );
}
