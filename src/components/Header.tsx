import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [opened, setOpened] = useState(false);
  return (
    <header>
      <div className="bg-white text-lg flex flex-row h-16 justify-between opacity-90 px-3 shadow-md fixed w-full z-40">
        {/* ロゴ */}
        <Link href="/" className="m-2 flex flex-row items-center">
          <picture>
            <source type="image/webp" srcSet="/images/common/oucrc-logo.webp" />
            <Image
              width={300}
              height={70}
              className="h-10 hidden md:block mr-2"
              src="/images/common/oucrc-logo.png"
              alt="ロゴ"
            />
          </picture>
          <picture>
            <source
              type="image/webp"
              srcSet="/images/common/oucrc-label.webp"
            />
            <Image
              width={300}
              height={70}
              className="h-8"
              src="/images/common/oucrc-label.png"
              alt="岡山大学電子計算機研究会"
            />
          </picture>
        </Link>
        {/* ▲ ロゴ */}

        {/* ▼ PC ナビゲーション */}
        <div className="hidden md:flex flex-grow justify-end">
          <nav id="navigation" className="self-center h-full">
            <Link
              href="/"
              className="border-b-2 border-white hover:border-divider"
            >
              ホーム
            </Link>
            <Link
              href="/articles"
              className="border-b-2 border-white hover:border-divider"
            >
              作品紹介
            </Link>
            <Link
              href="/members"
              className="border-b-2 border-white hover:border-divider"
            >
              部員紹介
            </Link>
            <Link
              href="/join"
              className="border-b-2 border-white hover:border-divider"
            >
              入部フォーム
            </Link>
          </nav>
        </div>
        {/* <!-- ▲ PC ナビゲーション --> */}

        {/* <!-- ▼ スマホ ハンバーガーメニュー --> */}
        <div className="h-auto flex flex-row">
          <button
            className="focus:outline-none"
            onClick={() => setOpened(!opened)}
            type="button"
          >
            <Image
              v-if="!flag"
              src="/images/header/hamburger.svg"
              width="18"
              height="18"
              alt="メニュー"
              className="m-2 block md:hidden"
            />
            <Image
              v-if="flag"
              src="/images/header/close.svg"
              width="18"
              height="18"
              alt="キャンセル"
              className="m-2 md:hidden"
            />
            <span className="hamburger">ハンバーガーメニュー</span>
          </button>
        </div>
        {/* <!-- ▲ スマホ ハンバーガーメニュー --> */}
      </div>

      {opened && (
        <div className="navbar fixed text-center text-xl z-40">
          {/* <!-- ▼ スマホ ナビゲーション --> */}
          <nav className="self-center h-full">
            <div className="py-5">
              <Link
                href="/"
                className="border-b-2 border-white hover:border-divider"
              >
                ホーム
              </Link>
            </div>
            <div className="py-5">
              <Link
                href="/articles"
                className="border-b-2 border-white hover:border-divider"
              >
                作品紹介
              </Link>
            </div>
            <div className="py-5">
              <Link
                href="/members"
                className="border-b-2 border-white hover:border-divider"
              >
                部員紹介
              </Link>
            </div>
            <div className="py-5">
              <Link
                href="/join"
                className="border-b-2 border-white hover:border-divider"
              >
                入部フォーム
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
