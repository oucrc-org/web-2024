import ArticleCard from '@/components/ArticleCard';
import ArticleContent from '@/components/ArticleContent';
import HeadingH2 from '@/components/HeadingH2';
import {
  getAllArticles,
  getArticle,
  getOtherArticlesBySameMember,
  getRecommendedArticles,
} from '@/utils/micro-cms';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { previewData } from 'next/headers';

import 'highlight.js/styles/androidstudio.css';
import Script from 'next/script';
import MemberInfo from '@/components/MemberInfo';
import { PreviewData } from '@/pages/api/preview';
import PreviewExitButton from '@/components/client/PreviewExitButton';

export const revalidate = 600;

type Params = {
  params: { articleId: string };
};

export async function generateStaticParams() {
  const articles = await getAllArticles();
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

export default async function ArticlePage({ params: { articleId } }: Params) {
  const preview = previewData() as PreviewData | undefined;
  const article = await getArticle(
    articleId,
    preview ? preview.draftKey : undefined
  );
  if (!article) {
    notFound();
  }
  const otherArticles = await getOtherArticlesBySameMember(article);
  const recommendedArticles = await getRecommendedArticles(article);
  const mathConfig = `
  if(typeof window !== "undefined") {
    window.MathJax.Hub.Config({
      tex2jax: {
        // 本文だけ適用
        processClass: 'prose',
        ignoreClass: '!prose',
        inlineMath: [['$', '$'], ["\\(","\\)"] ],
        displayMath: [ ['$$','$$'], ["\\[","\\]"] ]
      },
      CommonHTML: { matchFontHeight: false }
    });
  }
  `;
  return (
    <div className="pt-16">
      {preview && <PreviewExitButton />}
      {/* TODO: MathJax@3系で動かない原因を調査 */}
      <Script
        async
        src="https://cdn.jsdelivr.net/npm/mathjax@2.7.9/MathJax.js?config=TeX-AMS_HTML"
      />
      {/* インライン数式の設定を上書き */}
      <Script
        id="mathjax_config"
        type="text/x-mathjax-config"
        dangerouslySetInnerHTML={{ __html: mathConfig }}
      />

      <div className="grid-cols-3 gap-8 pb-10 lg:mt-16 lg:grid xl:gap-12">
        <ArticleContent article={article} />
        <section className="border-t border-divider bg-white px-8 pt-16 sm:px-16 md:px-24 lg:border-none lg:px-0 lg:pt-0 lg:shadow-xl">
          <MemberInfo member={article.name} />
          {otherArticles.contents.length > 0 && (
            <div className="pt-24 text-center sm:mx-10">
              <>
                <HeadingH2>この人が書いた記事</HeadingH2>
                {otherArticles.contents.map((article, index) => {
                  <div key={index}>
                    <ArticleCard article={article} className="py-8" />
                  </div>;
                })}
              </>
            </div>
          )}

          {/* <!-- ▼ 最新のオススメ記事 --> */}
          {recommendedArticles.contents.length > 0 && (
            <div className="pt-24 text-center sm:mx-10">
              <HeadingH2>最新のオススメ記事</HeadingH2>
              {recommendedArticles.contents.map((article, index) => (
                <div key={index}>
                  <ArticleCard article={article} className="py-8" />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
