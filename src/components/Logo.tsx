import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="m-2 flex items-center">
      <picture>
        <source type="image/webp" srcSet="/images/common/oucrc-logo.webp" />
        <Image
          width={40}
          height={40}
          className="mr-2 hidden h-10 md:block"
          src="/images/common/oucrc-logo.png"
          alt="ロゴ"
        />
      </picture>
      <picture>
        <source type="image/webp" srcSet="/images/common/oucrc-label.webp" />
        <Image
          width={238}
          height={32}
          className="h-8"
          src="/images/common/oucrc-label.png"
          alt="岡山大学電子計算機研究会"
        />
      </picture>
    </Link>
  );
}
