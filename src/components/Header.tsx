'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [opened, setOpened] = useState(false);
  return (
    <header>
      <div className="fixed z-40 flex h-16 w-full flex-row justify-between bg-white px-3 text-lg opacity-90 shadow-md">
        {/* ロゴ */}
        <Link href="/" className="m-2 flex flex-row items-center">
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
        <div className="hidden grow justify-end md:flex">
          <nav id="navigation" className="h-full self-center">
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
        <div className="flex h-auto flex-row">
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
        <div className="navbar fixed z-40 text-center text-xl">
          {/* <!-- ▼ スマホ ナビゲーション --> */}
          <nav className="h-full self-center">
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
