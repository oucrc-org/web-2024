import Container from '@/components/Container';
import Script from 'next/script';
import { ReactNode } from 'react';

export const revalidate = 3600;

/**
 * お知らせページ共通レイアウト
 */
export default async function NewsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Container className="pt-32">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
        <div className="md:col-span-3">{children}</div>
        <div className="md:col-span-2">
          <a
            className="twitter-timeline"
            data-width="1200"
            data-theme="light"
            href="https://twitter.com/oucrc?ref_src=twsrc%5Etfw"
          >
            Tweets by oucrc
          </a>
          <Script
            async
            strategy="afterInteractive"
            src="https://platform.twitter.com/widgets.js"
          />
        </div>
      </div>
    </Container>
  );
}
