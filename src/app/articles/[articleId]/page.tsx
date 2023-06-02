import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleContent from '@/components/ArticleContent';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import MemberInfo from '@/components/MemberInfo';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';

import {
  getAllArticleIds,
  getArticle,
  getOtherArticlesBySameMember,
  getRecommendedArticles,
} from '@/utils/micro-cms';
import ArticleCard from '@/components/ArticleCard';
import HeadingH2 from '@/components/HeadingH2';
import { Suspense } from 'react';

type Params = {
  params: { articleId: string };
};

export async function generateStaticParams() {
  const articles = await getAllArticleIds();
  return articles.contents.map(({ id: articleId }) => ({
    articleId,
  }));
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

// これはdraftルートで使ってはいけない。
// `draftKey`無しのレスポンスがキャッシュされてしまう

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

export default async function ArticlePage({ params: { articleId } }: Params) {
  const article = await getArticle(articleId);
  if (!article) {
    notFound();
  }
  return (
    <TwoColumnLayout
      sidebarChildren={
        <>
          <MemberInfo member={article.name} />
          {/* <!-- ▼ 同部員の他の記事 --> */}
          <Suspense fallback={<LoadingSkeleton />}>
            <OtherArticles articleId={articleId} />
          </Suspense>
          {/* <!-- ▼ 最新のオススメ記事 --> */}
          <Suspense fallback={<LoadingSkeleton />}>
            <RecommendedArticles articleId={articleId} />
          </Suspense>
        </>
      }
    >
      <ArticleContent article={article} />
    </TwoColumnLayout>
  );
}
