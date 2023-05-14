import Image from 'next/image';
import Script from 'next/script';
import { AiFillCrown } from 'react-icons/ai';
import { Article } from '@/types/micro-cms';
import { formatDate } from '@/utils/date';
import ButtonWithIcon from './ButtonWithIcon';
import CategoryButton from './CategoryButton';
import SeriesButton from './SeriesButton';

interface ArticleContentProps {
  article: Article;
}

type RankingObject = {
  title: string;
  bg_class: string;
  text_class: string;
  data: Article['id'][];
};

/**
 * 旧サイトの`components/ArticleContent.vue`を移植
 */
export default function ArticleContent({ article }: ArticleContentProps) {
  /**
   * 2021年記事コンのデータ
   * microCMSのHobbyにおけるAPI数上限のため、旧サイトでもハードコーディングしていた
   * 暫定的にそのまま移植
   * TODO: ハードコーディングをやめる
   */
  const ranking: Record<string, RankingObject> = {
    views: {
      title: '2021年アクセスランキング:',
      bg_class: 'bg-yellow-100',
      text_class: 'text-yellow-500',
      data: ['zc-pub38s', 'o2ql0oomqfd', 'e6vkrz4uqtt'],
    },
    technology: {
      title: '2021年技術記事:',
      bg_class: 'bg-green-100',
      text_class: 'text-green-500',
      data: ['vbp0hni4l', '66dakcrrl', 'wlb6a8w9m'],
    },
    interesting: {
      title: '2021年おもしろ記事:',
      bg_class: 'bg-pink-100',
      text_class: 'text-pink-500',
      data: ['3cv3mk166ude', 'vbp0hni4l', 'uqj8wl-ldpg2'],
    },
    beginner: {
      title: '2021年初心者記事:',
      bg_class: 'bg-blue-100',
      text_class: 'text-blue-500',
      data: ['sov344416', 'zlu04tkzslcw', 'wd1erphyov8'],
    },
    series_technology: {
      title: '2021年技術シリーズ:',
      bg_class: 'bg-green-100',
      text_class: 'text-green-500',
      data: ['h_19frtxx7c', 'cfykct7kadve', ''],
    },
    series_interesting: {
      title: '2021年おもしろシリーズ:',
      bg_class: 'bg-pink-100',
      text_class: 'text-pink-500',
      data: ['qpwi_a2-8o', 'r_vu3w1g5', 'ti_xc21a7'],
    },
    series_beginner: {
      title: '2021年初心者シリーズ:',
      bg_class: 'bg-blue-100',
      text_class: 'text-blue-500',
      data: ['wnkvw5pd8b1', 'cfykct7kadve', 'h_19frtxx7c'],
    },
  };
  let rankingResult: RankingObject[] = [];
  Object.keys(ranking).forEach((key) => {
    const object = ranking[key];
    if (object.data.includes(article.id)) {
      rankingResult.push(object);
    }
  });
  /** web-2021よりコピーしたが、インライン数式において半角括弧は対象から外した */
  const mathConfig = `
  if(typeof window !== "undefined" && window.MathJax) {
    window.MathJax.Hub.Config({
      TeX: { equationNumbers: { autoNumber: 'AMS' } },
      tex2jax: {
        inlineMath: [
          ['$', '$'],
        ],
        processEscapes: true,
      },
      'HTML-CSS': { matchFontHeight: false },
      displayAlign: 'center',
      displayIndent: '2em',
    });
    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
  }`;

  return (
    <section className="row-span-2 bg-white pb-12 lg:col-span-2 lg:shadow-xl">
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
      {/* ツイート埋め込み対応 */}
      <Script
        async
        strategy="afterInteractive"
        src="https://platform.twitter.com/widgets.js"
      />
      {article.image ? (
        <Image
          src={article.image.url}
          // 不定のため適当
          width={800}
          height={450}
          className="md:h-120 h-64 w-full object-cover sm:h-96"
          alt="トップ画像"
        />
      ) : (
        <Image
          src="/images/article/cover.jpg"
          // 画像ファイルの1/4サイズ
          width={961}
          height={595}
          className="m-auto block w-full"
          alt="トップ画像"
        />
      )}
      <div className="mx-8 mt-6 text-4xl font-bold tracking-wider sm:mx-16 sm:text-5xl">
        {article.title.replace(/　/g, ' ')}
      </div>
      <div className="mx-8 mb-8 mt-6 sm:mx-16">
        {article.name && (
          <div className="overflow-hidden tracking-widest text-secondary sm:text-lg">
            執筆者: {article.name.name}
          </div>
        )}
        <div className="tracking-widest text-secondary sm:text-lg">
          最終更新: {formatDate(article.updatedAt)}
        </div>
      </div>
      <div className="m-8 flex flex-wrap gap-3 sm:mx-16">
        {article.category && <CategoryButton category={article.category} />}
        {article.series && <SeriesButton series={article.series} />}
      </div>
      {/* <!-- ▼ ランキング --> */}
      {rankingResult.length > 0 && (
        <div className="m-8 flex flex-wrap gap-3 sm:mx-16">
          {Object.entries(rankingResult).map(([key, value], index) => {
            return (
              <ButtonWithIcon
                key={index}
                icon={<AiFillCrown />}
                className={`${value.bg_class} cursor-default`}
              >
                {value.title}
                <span className="ml-1 font-bold">
                  {value.data.indexOf(article.id) + 1}位
                </span>
              </ButtonWithIcon>
            );
          })}
        </div>
      )}
      {/* <!-- ▲ ランキング --> */}
      {article.error && (
        <div className="alert alert-error inline-block">
          <b>記事のパースに失敗したため、言語指定が適用されていません:</b>
          <code>{article.error}</code>
        </div>
      )}
      <div
        dangerouslySetInnerHTML={{ __html: article.body }}
        className="prose block w-full max-w-none px-8 text-lg leading-8 tracking-wider sm:px-16"
      ></div>
    </section>
  );
}
