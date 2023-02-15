import Link from 'next/link';

const Footer = () => {
  return (
    <div className="z-30 h-48 w-full grow-0 bg-footer sm:h-64">
      <Link href="/">
        <picture>
          <source
            type="image/webp"
            srcSet="/images/common/oucrc-label-reverse.webp"
          />
          <img
            className="mx-auto mt-16 h-10 sm:mt-20 sm:h-16"
            src="/images/common/oucrc-label-reverse.png"
            alt="岡山大学電子計算機研究会"
          />
        </picture>
      </Link>
      <div className="pt-12 text-center text-sm text-white sm:pt-20">
        &copy; 2023 OUCRC All rights reserved
      </div>
    </div>
  );
};

export default Footer;
