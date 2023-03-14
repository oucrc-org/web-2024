import { Article } from '@/types/micro-cms';
import { formatDate } from '@/utils/date';
import Image from 'next/image';
import { AiFillCrown } from 'react-icons/ai';
import SeriesButton from './SeriesButton';
import CategoryButton from './CategoryButton';
import ButtonWithIcon from './ButtonWithIcon';

interface ArticleContentProps {
  article: Article;
}

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
  const ranking = {
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

  return (
    <section className="row-span-2 bg-white pb-20 lg:col-span-2 lg:shadow-xl">
      {article.image ? (
        <Image
          src={article.image.url}
          // 不定のため適当
          width={800}
          height={450}
          className="h-64 w-full object-cover sm:h-96 md:h-120"
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
      <div className="m-8 flex flex-wrap gap-3 sm:mx-16">
        {Object.entries(ranking).map(([key, value], index) => {
          return value.data.includes(article.id) ? (
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
          ) : null;
        })}
      </div>
      {/* <!-- ▲ ランキング --> */}

      <div
        dangerouslySetInnerHTML={{ __html: article.body }}
        className="prose mt-16 block w-full max-w-none px-8 text-lg leading-8 tracking-wider sm:px-16"
      ></div>
    </section>
  );
}
