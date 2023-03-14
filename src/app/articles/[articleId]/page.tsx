import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { previewData } from 'next/headers';
import { Suspense } from 'react';
import ArticleCard from '@/components/ArticleCard';
import ArticleContent from '@/components/ArticleContent';
import HeadingH2 from '@/components/HeadingH2';
import {
  getAllArticleIds,
  getArticle,
  getOtherArticlesBySameMember,
  getRecommendedArticles,
} from '@/utils/micro-cms';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import MemberInfo from '@/components/MemberInfo';
import { PreviewData } from '@/pages/api/preview';
import PreviewExitButton from '@/components/client/PreviewExitButton';

import 'highlight.js/styles/androidstudio.css';

/** articles/layout.tsxの更新間隔を上書き */
export const revalidate = 600;

type Params = {
  params: { articleId: string };
};

export async function generateStaticParams() {
  const articles = await getAllArticleIds();
  return articles.contents.map(({ id: articleId }) => ({
    articleId,
  }));
}

/** これが完了する前にページを表示できるように分離 */
async function OtherArticles({ articleId }: { articleId: string }) {
  const otherArticles = await getOtherArticlesBySameMember(articleId);
  return otherArticles && otherArticles.contents.length > 0 ? (
    <div className="pt-24 text-center sm:mx-10">
      <>
        <HeadingH2>この人が書いた記事</HeadingH2>
        {otherArticles.contents.map((article, index) => (
          <ArticleCard key={index} article={article} className="py-8" />
        ))}
      </>
    </div>
  ) : null;
}

/** これが完了する前にページを表示できるように分離 */
async function RecommendedArticles({ articleId }: { articleId: string }) {
  const recommendedArticles = await getRecommendedArticles(articleId);
  {
    /* <!-- ▼ 最新のオススメ記事 --> */
  }
  return recommendedArticles && recommendedArticles.contents.length > 0 ? (
    <div className="pt-24 text-center sm:mx-10">
      <HeadingH2>最新のオススメ記事</HeadingH2>
      {recommendedArticles.contents.map((article, index) => (
        <ArticleCard key={index} article={article} className="py-8" />
      ))}
    </div>
  ) : null;
}

export async function generateMetadata({
  params: { articleId },
}: Params): Promise<Metadata | void> {
  const article = await getArticle(articleId);
  if (article) {
    const { title, body, twitter_comment, image } = article;
    // TODO: twitter_commentがない場合HTMLが混入する対策
    const description = twitter_comment ?? body.slice(0, 140);
    if (image) {
      const { url, width, height } = image;
      return {
        title,
        description,
        openGraph: { images: [{ url, width, height }] },
      };
    }
    return { title, description };
  }
}

export default async function ArticlePage({ params: { articleId } }: Params) {
  const preview = previewData() as PreviewData | undefined;
  const article = await getArticle(
    articleId,
    preview ? preview.draftKey : undefined
  );
  if (!article) {
    notFound();
  }
  return (
    <>
      {preview && <PreviewExitButton />}
      <div className="grid-cols-3 gap-8 pb-10 lg:grid xl:gap-12">
        <ArticleContent article={article} />
        <section className="border-t border-divider bg-white px-8 pt-16 sm:px-16 md:px-24 lg:border-none lg:px-0 lg:pt-0 lg:shadow-xl">
          <MemberInfo member={article.name} />
          {/* <!-- ▼ 同部員の他の記事 --> */}
          <Suspense fallback={<LoadingSkeleton />}>
            {/* @ts-expect-error Server Component */}
            <OtherArticles articleId={articleId} />
          </Suspense>
          {/* <!-- ▼ 最新のオススメ記事 --> */}
          <Suspense fallback={<LoadingSkeleton />}>
            {/* @ts-expect-error Server Component */}
            <RecommendedArticles articleId={articleId} />
          </Suspense>
        </section>
      </div>
    </>
  );
}
