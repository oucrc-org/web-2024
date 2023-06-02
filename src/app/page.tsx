import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import Card from '@/components/Card';
import HeroArea from '@/components/client/HeroArea';
import Contact from '@/components/Contact';
import Container from '@/components/Container';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import NewsList from '@/components/NewsList';
import FadeIn from '@/components/client/FadeIn';
import DoubleLineButton from '@/components/DoubleLineButton';

export const revalidate = 3600;

export default async function Page() {
  return (
    <div className="flex flex-col">
      {/* 部室写真の背景 */}
      <div
        className="parallax fixed left-0 top-16 z-0 h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/landing/oucrc-room.jpg)' }}
      />
      <HeroArea />
      {/* <!-- ▼ 電子計算機研究会とは --> */}
      <section className="relative w-full border-t-2 bg-white py-32">
        <div className="container mx-auto flex flex-col gap-y-16">
          <FadeIn className="flex flex-col divide-y divide-divider px-4 sm:px-24 md:px-40 lg:px-64 xl:px-96">
            <h2 className="mb-4 text-center text-3xl font-bold tracking-widest sm:text-4xl">
              電子計算機研究会とは
            </h2>
            <p className="pt-5 text-center tracking-widest text-secondary sm:text-lg">
              何をしているところなの？
            </p>
          </FadeIn>
          <div className="grid gap-16 px-5 sm:grid-cols-3">
            <FadeIn>
              <Card
                href="/articles/category/noi18t4xa3"
                categoryName="プログラミング"
                imageSrc="/images/landing/cover-programming.webp"
                description="スマホアプリやゲームなどを、個人で開発したり、グループでプロジェクトを立ち上げたりしています！"
              ></Card>
            </FadeIn>
            <FadeIn>
              <Card
                href="/articles/category/2_x0e6wfbu"
                categoryName="電子工作"
                imageSrc="/images/landing/cover-electronic.webp"
                description="部室には道具がたくさんあるので、電子工作に挑戦するのに金銭的負担やハードルがないのも魅力です。"
              ></Card>
            </FadeIn>
            <FadeIn>
              <Card
                href="/articles/category/ls-ivl76nq2"
                categoryName="ガジェット/ハードウェア"
                imageSrc="/images/landing/cover-gadget.webp"
                description="過去にはXboxを分解したり、部の余ったPCに好きなOSを入れてサーバーを立てたりしました。"
              ></Card>
            </FadeIn>
          </div>
          <p className="text-center text-lg font-semibold leading-8 tracking-widest text-secondary">
            他にも、
            <br className="sm:hidden" />
            3Dプリンタで色々なものを制作したり
            <br className="sm:hidden" />
            ゲーム大会を開いたりしています！
          </p>
        </div>
      </section>
      {/* <!-- ▲ 電子計算機研究会とは --> */}

      {/* // <!-- ▼ 電算研の部室 --> */}
      <section className="relative z-10 h-[83vh] w-full">
        <div className="container relative mx-auto h-full">
          <FadeIn>
            <Image
              className="absolute top-[5vh] left-0"
              src="/images/landing/oucrc-room-label.png"
              width={355}
              height={384}
              alt="電算研の部室"
            />
          </FadeIn>
          <FadeIn className="absolute bottom-[5vh] right-0 ">
            <Link href="/news/l99fk47dvp6">
              <Image
                className="h-[8vh] shadow-2xl transition duration-500 ease-in-out hover:scale-105"
                src="/images/landing/oucrc-room-button.png"
                width={308}
                height={77}
                alt="部室に何があるの？"
              />
            </Link>
          </FadeIn>
        </div>
      </section>
      {/* <!-- ▲ 電算研の部室 --> */}

      {/* <!-- ▼ お知らせ --> */}
      <section className="relative z-20 bg-white pb-16 pt-10 lg:py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-5">
            <div className="image text-center lg:col-span-2">
              <Link href="/news/qbrftlmtqk">
                <Image
                  src="/images/landing/shinkan.png"
                  width={342}
                  height={242}
                  alt="キャラ"
                />
              </Link>
            </div>
            <div className="px-3 lg:col-span-3">
              <Suspense fallback={<LoadingSkeleton />}>
                <NewsList pageNumber={1} enablePagination={false} />
              </Suspense>
              <div className="flex justify-end pt-4">
                <Link href="/news">
                  <DoubleLineButton>もっとみる</DoubleLineButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ▲ お知らせ --> */}
      <div className="z-20 w-full bg-white py-8">
        <Container>
          <Contact />
        </Container>
      </div>
    </div>
  );
}
