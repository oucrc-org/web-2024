import ArticleCard from '@/components/ArticleCard';
import HeadingH2 from '@/components/HeadingH2';
import MemberInfo from '@/components/MemberInfo';
import {
  getAllMembers,
  getMember,
  getArticlesByMember,
} from '@/utils/micro-cms';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const revalidate = 600;

type Params = {
  params: { memberId: string };
};

export async function generateStaticParams() {
  const members = await getAllMembers();
  return members.contents.map(({ id: memberId }) => ({
    memberId,
  }));
}

export async function generateMetadata({
  params: { memberId },
}: Params): Promise<Metadata | void> {
  const member = await getMember(memberId);
  if (member) {
    const { name, status, avatar } = member;
    if (avatar) {
      const { url, width, height } = avatar;
      return {
        title: name,
        description: status,
        openGraph: { images: [{ url, width, height }] },
      };
    }
    return { title: name, description: status };
  }
}

export default async function MemberPage({ params: { memberId } }: Params) {
  const member = await getMember(memberId);
  if (!member) {
    notFound();
  }
  const articles = await getArticlesByMember(member);
  return (
    <>
      {/* <!---------------------------------------------------  部員情報  ---------------------------------------------------> */}
      <section className="container mx-auto px-3 pt-16 lg:pt-0">
        <div className="mt-16 flex flex-col justify-between px-6 md:mt-20 md:flex-row">
          <MemberInfo member={member} />

          <div className="mt-8 grow border-highlight md:mt-0 md:border-l-4 md:pl-8">
            {/* <!-- ▼ 自己紹介 --> */}
            <div className="inline-block bg-primary py-2 px-8 text-center text-sm font-bold tracking-widest text-white">
              自己紹介
            </div>
            <div
              className="prose mt-4 leading-8 tracking-widest text-secondary"
              dangerouslySetInnerHTML={{ __html: member.intro ?? 'なし' }}
            />
            {/* <!-- ▲ 自己紹介 --> */}
          </div>
        </div>

        {/* <!-- ▼ 自己紹介画像 --> */}
        {member.introimage && (
          <div className="my-32">
            <HeadingH2>自己紹介画像</HeadingH2>
            <Image
              className="w-full"
              src={member.introimage.url}
              alt={member.name + 'の自己紹介画像'}
            />
          </div>
        )}
        {/* <!-- ▲ 自己紹介画像 --> */}

        {/* <!-- ▼ この人が書いた記事 --> */}
        {articles.contents.length > 0 && (
          <div
            v-if="members.contents !== void 0 && members.contents.length"
            className="mb-24 mt-10 pt-16 text-center lg:mx-8 xl:mx-12"
          >
            <div className="container mx-auto">
              <HeadingH2>
                この人が書いた記事 最新{articles.contents.length}件
              </HeadingH2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                {articles.contents.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </div>
        )}
        {/* <!-- ▲ この人が書いた記事 --> */}
      </section>
    </>
  );
}
