import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="relative bottom-0 z-20 flex w-full flex-col gap-y-2 bg-footer py-8 text-center">
      <Link href="/" className="mx-auto inline h-10 sm:h-16">
        <Image
          width={300}
          height={40}
          src="/images/common/oucrc-label-reverse.png"
          alt="岡山大学電子計算機研究会"
        />
      </Link>
      <div className="text-center text-sm text-white">
        &copy; 2023 OUCRC All rights reserved
        <br />
        <small>
          {`Code and license info is available on `}
          <a
            href="https://github.com/oucrc-org/web-2024#readme"
            target="_blank"
            className="underline"
          >
            GitHub
          </a>
        </small>
      </div>
    </div>
  );
}
