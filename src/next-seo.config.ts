import { DefaultSeoProps } from 'next-seo';

const title = 'OUCRC | 岡山大学電子計算機研究会';
const description = `岡山大学電子計算機研究会は、パソコンを使ってプログラミングやDTMをしたり、電子工作や3Dプリンターなど "モノづくり" をしている部活です！部にはVRゴーグルやタブレットなどの機材があり、デバッグなども気軽にできます！また、電子工作のパーツや3Dプリンターなどもあるため、ハードルなく "モノづくり" の世界に入ることができます！そして、息抜きにはゲーム大会を開いたり、漫画を読むこともできます。岡大に入学して部活動・サークル選びに迷っている方は、ぜひ一度遊びに来てください！`;
const url = 'https://oucrc.net/';

const config: DefaultSeoProps = {
  title,
  titleTemplate: `%s - ${title}`,
  description,
  canonical: url,
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url,
    siteName: title,
    description,
    images: [
      {
        url: 'https://images.microcms-assets.io/assets/9db8326938b34b1381d6805cc5e10b04/e4434ebf7e8a426aaaa71f16dea02a74/cover.jpg',
      },
    ],
  },
  twitter: {
    handle: '@oucrc',
    site: '@oucrc',
    cardType: 'summary_large_image',
  },
};

export default config;
