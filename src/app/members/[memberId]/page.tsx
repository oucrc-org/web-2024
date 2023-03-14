import ArticleCard from '@/components/ArticleCard';
import HeadingH2 from '@/components/HeadingH2';
import MemberInfo from '@/components/MemberInfo';
import {
  getAllMemberIds,
  getMember,
  getArticlesByMember,
} from '@/utils/micro-cms';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

type Params = {
  params: { memberId: string };
};

export async function generateStaticParams() {
  const members = await getAllMemberIds();
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

/** これが完了する前にページを表示できるように分離 */
async function ArticlesByMember({ memberId }: { memberId: string }) {
  const articles = await getArticlesByMember(memberId);
  return articles && articles?.contents.length > 0 ? (
    <div className="flex flex-col gap-y-8">
      <HeadingH2>
        この人が書いた記事 最新{articles?.contents.length}件
      </HeadingH2>
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:grid-cols-3">
        {articles?.contents.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  ) : null;
}

export default async function MemberPage({ params: { memberId } }: Params) {
  const member = await getMember(memberId);
  if (!member) {
    notFound();
  }
  return (
    <>
      {/* <!---------------------------------------------------  部員情報  ---------------------------------------------------> */}
      <div className="grid grid-cols-1 px-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <MemberInfo member={member} />
        </div>
        <div className="mt-8 border-highlight lg:col-span-2 lg:mt-0 lg:border-l-4 lg:pl-8">
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
      <Suspense fallback={<LoadingSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <ArticlesByMember memberId={memberId} />
      </Suspense>
      {/* <!-- ▲ この人が書いた記事 --> */}
    </>
  );
}
