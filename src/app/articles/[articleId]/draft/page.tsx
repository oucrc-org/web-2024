import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { generateArticleMetadata, getArticleDraft } from '@/utils/micro-cms';
import ArticleContent from '@/components/ArticleContent';
import PreviewExitButton from '@/components/PreviewExitButton';

type Params = {
  params: { articleId: string };
  searchParams: { draftKey: string | string[] };
};

export async function generateMetadata({
  params: { articleId },
  searchParams: { draftKey },
}: Params): Promise<Metadata | void> {
  return await generateArticleMetadata(articleId, draftKey);
}

/** プレビュー時にはこちらが使われる */
export default async function ArticlePage({
  params: { articleId },
  searchParams: { draftKey },
}: Params) {
  // 変更せずにプレビューすると空になる
  if (typeof draftKey !== 'string' || draftKey === '') {
    redirect(`/articles/${articleId}`);
  }
  const article = await getArticleDraft(articleId, { draftKey });
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
