import { ReactNode } from 'react';
import Script from 'next/script';
import '@/styles/globals.css';
import fontStyles from '../styles/font.module.css';
import { Noto_Sans_JP } from 'next/font/google';
import { clientEnv } from '@/config/client-env';
import Drawer from '@/components/Drawer';
import { Toaster } from 'react-hot-toast';

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  // こうしないとアルファベットが丸くなってしまう
  adjustFontFallback: true,
  fallback: [
    'Source Sans Pro',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Helvetica Neue',
    'Noto Sans',
  ],
});

const siteName = 'OUCRC | 岡山大学電子計算機研究会';
const description = `岡山大学電子計算機研究会は、パソコンを使ってプログラミングやDTMをしたり、電子工作や3Dプリンターなど "モノづくり" をしている部活です！部にはVRゴーグルやタブレットなどの機材があり、デバッグなども気軽にできます！また、電子工作のパーツや3Dプリンターなどもあるため、ハードルなく "モノづくり" の世界に入ることができます！そして、息抜きにはゲーム大会を開いたり、漫画を読むこともできます。岡大に入学して部活動・サークル選びに迷っている方は、ぜひ一度遊びに来てください！`;
const ogImageUrl =
  'https://images.microcms-assets.io/assets/9db8326938b34b1381d6805cc5e10b04/e4434ebf7e8a426aaaa71f16dea02a74/cover.jpg';

/**
 * next-seoに相当する機能のapp directory版
 * @see https://beta.nextjs.org/docs/api-reference/metadata#icons
 */
export const metadata = {
  // Netlifyなので指定が必要
  metadataBase: new URL(process.env.URL ?? 'http://localhost:3000'),
  title: { default: siteName, template: `%s - ${siteName}` },
  description,
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName,
    description,
    images: [
      {
        url: ogImageUrl,
      },
    ],
  },
  verification: {
    google: 'gUJca8xJ_QAdQ02BNBQRL7jCS53EgM8BWQZqA7zbSQU',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
    site: '@oucrc',
    creator: '@oucrc',
    creatorId: '551682037', // 不変のTwitterユーザID
    images: [ogImageUrl],
  },
};

/**
 * 全ページ共通レイアウト
 */
export default async function Layout({ children }: { children: ReactNode }) {
  const gtmId = clientEnv.GTM_ID;
  return (
    <html lang="ja" data-theme="oucrc" className={`${notoSansJP.variable}`}>
      {/* theme定義はtailwind.config.js参照 */}
      <body className={fontStyles.font}>
        {gtmId && gtmId !== '' && (
          <>
            <Script
              id="gtm-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer', '${gtmId}');
`,
              }}
            />
          </>
        )}
        <div className="flex min-h-screen flex-col">
          {/* @ts-expect-error Server Component */}
          <Drawer>{children}</Drawer>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
