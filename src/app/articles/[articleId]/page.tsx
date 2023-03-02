import { ArticleCard } from '@/components/ArticleCard';
import { ArticleContent } from '@/components/ArticleContent';
import HeadingH2 from '@/components/HeadingH2';
import {
  getAllArticles,
  getArticle,
  getOtherArticlesBySameMember,
  getRecommendedArticles,
} from '@/utils/micro-cms';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import 'highlight.js/styles/androidstudio.css';
import Script from 'next/script';

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
}: Params): Promise<Metadata> {
  const { title, body, twitter_comment, image } = await getArticle(articleId);
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

export default async function ArticlePage({ params: { articleId } }: Params) {
  const article = await getArticle(articleId);
  const otherArticles = await getOtherArticlesBySameMember(article);
  const recommendedArticles = await getRecommendedArticles(article);
  const mathConfig = `
  if(typeof window !== "undefined") {
    window.MathJax.Hub.Config({
      tex2jax: {
        inlineMath: [['$', '$'], ["\\(","\\)"] ],
        displayMath: [ ['$$','$$'], ["\\[","\\]"] ]
      },
      CommonHTML: { matchFontHeight: false }
    });
  }
  `;
  return (
    <div className="container mx-auto">
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
        <section className="border-t border-divider bg-white pt-16 sm:px-16 md:px-24 lg:border-none lg:px-0 lg:pt-0 lg:shadow-xl">
          <div className="mt-12 grid grid-cols-9 gap-4">
            {/* <!-- ▼ メンバーアイコン --> */}
            <Link href={`/members/${article.name.id}`} className="col-span-4">
              {article.name && article.name.avatar ? (
                <div className="row-end-2 inline-block pl-8">
                  <Image
                    width={128}
                    height={128}
                    src={article.name.avatar.url}
                    className="h-32 w-32 rounded-full shadow-xl lg:h-24 lg:w-24 xl:h-32 xl:w-32"
                    alt="取得に失敗しました"
                  />
                </div>
              ) : (
                <div>
                  <Image
                    width={128}
                    height={128}
                    className="m-auto h-32 w-32 rounded-full object-cover shadow-xl lg:h-24 lg:w-24 xl:h-32 xl:w-32"
                    src="/assets/images/member/member.jpg"
                    alt="メンバーアイコン"
                  />
                </div>
              )}
            </Link>
            {/* <!-- ▲ メンバーアイコン --> */}

            {/* <!-- ▼ SNSリンク --> */}
            <div className="col-span-5 mt-2 inline-block pr-8 pl-4 text-right lg:pr-5 lg:pl-0 lg:text-center">
              <p className="inline-block rounded-lg bg-highlight px-5 py-1 text-sm tracking-widest text-secondary xl:px-6">
                {article.name.enteryear}年度 入部
              </p>
              <div className="pr-1 lg:text-left xl:pl-3">
                {article.name.twitter && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://twitter.com/${article.name.twitter.replace(
                      /@/g,
                      ''
                    )}`}
                  >
                    <Image
                      width={32}
                      height={32}
                      src="/images/member/sns-twitter.png"
                      alt="Twitter"
                      className="mr-1 mt-4 inline w-8 transition duration-200 ease-in-out hover:scale-110 xl:w-10"
                    />
                  </a>
                )}
                {article.name.github && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://github.com/${article.name.github.replace(
                      /@/g,
                      ''
                    )}`}
                  >
                    <Image
                      width={32}
                      height={32}
                      src="/images/member/sns-github.png"
                      alt="GitHub"
                      className="mt-4 inline w-8 transition duration-200 ease-in-out hover:scale-110 xl:w-10"
                    />
                  </a>
                )}
                {article.name.youtube && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.youtube.com/channel/${article.name.youtube}`}
                  >
                    <Image
                      width={32}
                      height={32}
                      src="/images/member/sns-youtube.png"
                      alt="YouTube"
                      className="ml-2 mt-4 inline w-6 transition duration-200 ease-in-out hover:scale-110 xl:w-8"
                    />
                  </a>
                )}
              </div>
            </div>
            {/* <!-- ▲ SNSリンク --> */}
          </div>

          {article.name && (
            <div className="mx-10 mt-3 pb-8 xl:mt-6">
              <p className="text-3xl font-bold tracking-widest text-secondary">
                <Link href="`/members/${article.name.id}`">
                  {article.name.name}
                </Link>
              </p>
              <p className="mt-1 leading-7 tracking-widest text-secondary">
                <Link href="`/members/${article.name.id}`">
                  {article.name.status}
                </Link>
              </p>
            </div>
          )}

          {otherArticles.contents.length > 0 && (
            <div className="mx-8 pt-24 text-center sm:mx-10">
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
            <div className="mx-8 pt-24 text-center sm:mx-10">
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
