import Container from '@/components/Container';
import HeadingH1 from '@/components/HeadingH1';
import MemberCard from '@/components/MemberCard';
import { Member } from '@/types/micro-cms';
import { getMembers } from '@/utils/micro-cms';

export const metadata = {
  title: '部員一覧',
  description:
    'OUCRC（岡山大学電子計算機研究会）の皆さんのプロフィールの一覧です！',
};

export default async function MemberIndexPage() {
  const members = await getMembers();
  const allMembers: Record<Member['enteryear'], Member[]> = {};
  const membersByYear: Record<string, Member[]> = {};
  members.contents.forEach((member) => {
    if (!allMembers[member['enteryear']]) {
      allMembers[member['enteryear']] = [];
    }
    allMembers[member['enteryear']].push(member);
  });
  Object.keys(allMembers)
    .sort((a, b) => {
      return Number(b) - Number(a);
    })
    .forEach((a) => {
      // ソート防止のため空白を付ける
      membersByYear[` ${a}`] = allMembers[Number(a)];
    });
  return (
    <>
      <HeadingH1>部員一覧</HeadingH1>
      <section className="mb-8">
        {Object.entries(membersByYear).map(([key, members]) => (
          <div key={key}>
            <div className="relative mb-12 mt-20 text-center">
              <div className="border-b border-heading pt-3"></div>
              <h3 className="absolute inset-x-0 top-0 mx-auto inline-block w-64 bg-white font-bold tracking-widest text-subtext">
                {key}年度入部 ({members.length}人)
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 sm:gap-6 sm:px-12 md:grid-cols-4 lg:grid-cols-5 lg:gap-10 xl:px-32">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
