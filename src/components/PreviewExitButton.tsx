import Link from 'next/link';

interface PreviewExitButtonProps {
  articleId: string;
}

export default function PreviewExitButton({
  articleId,
}: PreviewExitButtonProps) {
  return (
    <Link
      href={`/articles/${articleId}`}
      className="btn-primary btn-lg btn fixed left-3 bottom-3 z-50 bg-black text-white"
    >
      プレビューを終了
    </Link>
  );
}
