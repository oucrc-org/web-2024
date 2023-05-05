import { notFound, redirect } from 'next/navigation';
import ArticleContent from '@/components/ArticleContent';
import { getArticle } from '@/utils/micro-cms';
import PreviewExitButton from '@/components/PreviewExitButton';

/** draftKeyが不変でも内容の変化を反映する */
export const dynamic = 'force-dynamic';

type Params = {
  params: { articleId: string };
  searchParams: { draftKey: string | string[] };
};

/** プレビュー時にはこちらが使われる */
export default async function ArticlePage({
  params: { articleId },
  searchParams: { draftKey },
}: Params) {
  // 変更せずにプレビューすると空になる
  if (typeof draftKey !== 'string' || draftKey === '') {
    redirect(`/articles/${articleId}`);
  }
  const article = await getArticle(articleId, { draftKey });
  if (!article) {
    notFound();
  }
  return (
    <>
      {draftKey && <PreviewExitButton articleId={articleId} />}
      <ArticleContent article={article} />
    </>
  );
}
