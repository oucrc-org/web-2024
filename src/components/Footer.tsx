import Link from 'next/link';

const Footer = () => {
  return (
    <div className="bg-footer h-48 sm:h-64 w-full z-30 flex-grow-0">
      <Link href="/">
        <picture>
          <source
            type="image/webp"
            srcSet="/images/common/oucrc-label-reverse.webp"
          />
          <img
            className="h-10 sm:h-16 mt-16 sm:mt-20 mx-auto"
            src="/images/common/oucrc-label-reverse.png"
            alt="岡山大学電子計算機研究会"
          />
        </picture>
      </Link>
      <div className="text-sm text-center text-white pt-12 sm:pt-20">
        &copy; 2023 OUCRC All rights reserved
      </div>
    </div>
  );
};

export default Footer;
