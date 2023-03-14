import Link from 'next/link';
import { ReactNode, useId } from 'react';
import { metadata } from '@/app/layout';
import { getAllCategories } from '@/utils/micro-cms';
import Logo from './Logo';
import Footer from './Footer';

interface DrawerProps {
  children: ReactNode;
}

/**
 * ドロワーメニュー
 * CSSで切り替えることにより、サーバーコンポーネントとUI変化を両立させる
 * @see https://daisyui.com/components/drawer/
 */
export async function Drawer({ children }: DrawerProps) {
  const categories = await getAllCategories();
  const htmlCheckboxId = 'components__drawer';

  const CommonLinks = () => {
    return (
      <>
        <li>
          <Link href="/articles">作品紹介</Link>
        </li>
        <li>
          <Link href="/members">部員紹介</Link>
        </li>
        <li>
          <Link href="/join">入部フォーム</Link>
        </li>
      </>
    );
  };

  /**
   * 開閉式ドロップダウン
   * @see https://daisyui.com/components/navbar/#responsive-dropdown-menu-on-small-screen-center-menu-on-large-screen
   */
  const CategoryLinks = () => {
    return (
      <>
        {categories.contents.map((category) => (
          <li key={category.id}>
            <Link href={`/articles/category/${category.id}`}>
              {category.category}
            </Link>
          </li>
        ))}
      </>
    );
  };

  return (
    <div className="drawer">
      <input id={htmlCheckboxId} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content overflow-hidden">
        <nav
          aria-label="メインメニュー"
          className="navbar fixed top-0 left-0 z-50 w-full bg-white shadow-md"
        >
          <div className="flex-none lg:hidden">
            <label
              htmlFor={htmlCheckboxId}
              className="btn-ghost btn-square btn"
            >
              {/* ハンバーガー */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mr-2 flex-1">
            <Logo />
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              <CommonLinks />
              <li tabIndex={0}>
                <a>
                  カテゴリ
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
                <ul className="rounded-box right-0 z-50 bg-white p-2 shadow">
                  <CategoryLinks />
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        <main className="flex min-h-screen flex-col">
          <div className="max-w-[100vw] grow">{children}</div>
          <div className="grow-0">
            <Footer />
          </div>
        </main>
      </div>
      <aside aria-label="サイドメニュー" className="drawer-side">
        <label htmlFor={htmlCheckboxId} className="drawer-overlay"></label>
        <ul className="menu w-80 bg-base-100 p-4">
          <CommonLinks />
          <CategoryLinks />
        </ul>
      </aside>
    </div>
  );
}

export default Drawer;
