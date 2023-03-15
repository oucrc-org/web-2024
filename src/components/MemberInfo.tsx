import { Member } from '@/types/micro-cms';
import Image from 'next/image';
import Link from 'next/link';

interface MemberInfoProps {
  member: Member;
}

export default function MemberInfo({ member }: MemberInfoProps) {
  return (
    <div>
      <div className="mt-12 flex gap-4">
        {/* <!-- ▼ メンバーアイコン --> */}
        <Link href={`/members/${member.id}`} className="shrink-0">
          {member.avatar ? (
            <div className="lg:pl-8">
              <Image
                width={128}
                height={128}
                src={member.avatar.url}
                className="h-32 w-32 rounded-full shadow-xl lg:h-24 lg:w-24 xl:h-32 xl:w-32"
                alt={member.name}
              />
            </div>
          ) : (
            <div>
              <Image
                width={128}
                height={128}
                className="m-auto h-32 w-32 rounded-full object-cover shadow-xl lg:h-24 lg:w-24 xl:h-32 xl:w-32"
                src="/images/member/member.webp"
                alt="メンバーアイコン"
              />
            </div>
          )}
        </Link>
        {/* <!-- ▲ メンバーアイコン --> */}

        {/* <!-- ▼ SNSリンク --> */}
        <div className="mt-2 inline-block grow pl-4 text-left lg:pl-0">
          <p className="inline-block rounded-lg bg-highlight px-5 py-1 text-sm tracking-widest text-secondary xl:px-6">
            {member.enteryear}年度 入部
          </p>
          <div className="pr-1 lg:text-left xl:pl-3">
            {member.twitter && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://twitter.com/${member.twitter.replace(/@/g, '')}`}
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
            {member.github && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://github.com/${member.github.replace(/@/g, '')}`}
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
            {member.youtube && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.youtube.com/channel/${member.youtube}`}
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
      <div className="mt-3 pb-8 lg:mx-10 xl:mt-6">
        <p className="text-3xl font-bold tracking-widest text-secondary">
          <Link href="`/members/${member.id}`">{member.name}</Link>
        </p>
        <p className="mt-1 leading-7 tracking-widest text-secondary">
          <Link href="`/members/${member.id}`">{member.status}</Link>
        </p>
      </div>
    </div>
  );
}
