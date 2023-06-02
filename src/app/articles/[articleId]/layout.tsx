import { ReactNode, Suspense } from 'react';
import {
  getArticle,
  getOtherArticlesBySameMember,
  getRecommendedArticles,
} from '@/utils/micro-cms';
import ArticleCard from '@/components/ArticleCard';
import HeadingH2 from '@/components/HeadingH2';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import MemberInfo from '@/components/MemberInfo';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';

import 'highlight.js/styles/androidstudio.css';

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

/** 公開ページ・下書きページ共通のレイアウト */
export default async function ArticlePageLayout({
  children,
  params: { articleId },
}: Params) {
  const article = await getArticle(articleId);
  // ここでnotFoundを呼ぶと下書きに影響が出る
  if (article) {
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
        {children}
      </TwoColumnLayout>
    );
  } else {
    // 下書きが未公開の場合、`article.name` (執筆者)を取得できないため
    // サイドバーを描画しない
    return (
      <TwoColumnLayout
        sidebarChildren={
          <div className="p-3">
            通信の仕様上、下書きの場合はサイドバーを表示しません
          </div>
        }
      >
        {children}
      </TwoColumnLayout>
    );
  }
}
