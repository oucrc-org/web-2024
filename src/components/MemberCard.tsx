import { Member } from '@/types/micro-cms';
import Image from 'next/image';
import Link from 'next/link';

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <Link
      href={`/members/${member.id}`}
      className="transition duration-500 ease-in-out hover:scale-103"
    >
      <div className="text-center">
        {member.avatar ? (
          <Image
            className="m-auto h-24 w-24 rounded-full object-cover shadow-xl sm:h-32 sm:w-32"
            src={member.avatar.url}
            width={128}
            height={128}
            alt={member.name}
          />
        ) : (
          <Image
            className="m-auto h-24 w-24 rounded-full object-cover shadow-xl sm:h-32 sm:w-32"
            src="/images/member/member.webp"
            width={128}
            height={128}
            alt="メンバーアイコン"
          />
        )}
      </div>
      <div className="mt-3 text-center text-lg font-bold text-secondary">
        {member.name}
      </div>
      <div className="overflow-hidden px-3 text-center text-sm text-subtext">
        <div className="overflow- whitespace-no-wrap overflow-hidden text-ellipsis">
          {member.status}
        </div>
      </div>
    </Link>
  );
}
