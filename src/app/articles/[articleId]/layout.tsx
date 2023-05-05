import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReactNode, Suspense } from 'react';
import ArticleCard from '@/components/ArticleCard';
import HeadingH2 from '@/components/HeadingH2';
import {
  getArticle,
  getOtherArticlesBySameMember,
  getRecommendedArticles,
} from '@/utils/micro-cms';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import MemberInfo from '@/components/MemberInfo';

import 'highlight.js/styles/androidstudio.css';

/** articles/layout.tsxの更新間隔を上書き */
export const revalidate = 600;

type Params = {
  children: ReactNode;
  params: { articleId: string };
};

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

/** 公開ページ・下書きページ共通のレイアウト */
export default async function ArticlePageLayout({
  children,
  params: { articleId },
}: Params) {
  const article = await getArticle(articleId);
  if (!article) {
    notFound();
  }
  return (
    <>
      <div className="grid-cols-3 gap-8 pb-10 lg:grid xl:gap-12">
        {children}
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
