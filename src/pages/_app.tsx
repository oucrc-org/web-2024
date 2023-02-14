import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';
import { NextPageWithLayout } from '@/types/next';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const gtagId = process.env.NEXT_PUBLIC_GTAG_ID;
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <>
      <DefaultSeo {...SEO} />
      {/*
        アナリティクス設定
      */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', '${gtagId}');
           `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
