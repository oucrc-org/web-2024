'use client';
import Image from 'next/image';
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

export default function HeroArea() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute h-full w-full bg-white bg-repeat"></div>
      <div className="absolute top-0 w-full px-3 pt-56 text-center sm:pt-96">
        <Image
          className="mx-auto h-12 w-auto opacity-0 sm:h-20 md:h-24"
          src="/images/common/oucrc-label.webp"
          width={712}
          height={96}
          alt="岡山大学電子計算機研究会"
          style={{ animation: 'fadeIn 2s forwards' }}
        />
        <h2
          className="mt-4 text-lg tracking-widest opacity-0 sm:mt-8 sm:text-2xl"
          style={{ animation: 'fadeIn 4s forwards' }}
        >
          つくりたいものをつくる
        </h2>
      </div>
      <Image
        className="absolute inset-x-0 bottom-0 mx-auto h-40 w-auto opacity-0"
        src="/images/landing/scroll.webp"
        width={58}
        height={260}
        alt="Scroll"
        style={{ animation: 'fadeIn 2s 1s forwards', opacity: 0 }}
      />
      <div className="relative h-screen w-full">
        <Particles
          id="tsparticles"
          init={particlesInit}
          width="100%"
          height="100vh"
          options={{
            particles: {
              number: {
                value: 60,
                density: {
                  enable: true,
                  value_area: 1000,
                },
              },
              color: {
                value: '#595959',
              },
              shape: {
                type: 'circle',
                stroke: {
                  width: 0,
                  color: '#595959',
                },
                polygon: {
                  nb_sides: 5,
                },
                image: {
                  src: 'img/github.svg',
                  width: 100,
                  height: 100,
                },
              },
              opacity: {
                value: 0.5,
                random: false,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 3.5, // 旧サイトと基準が異なるらしく、4から変更
                random: true,
                anim: {
                  enable: false,
                  speed: 60,
                  size_min: 0.1,
                  sync: false,
                },
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: '#595959',
                opacity: 0.4,
                width: 1,
              },
              move: {
                enable: true,
                speed: 2.5, // 旧サイトと基準が異なるらしく、6から変更
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
            },
            interactivity: {
              detect_on: 'canvas',
              events: {
                onhover: {
                  enable: false,
                  mode: 'repulse',
                },
                onclick: {
                  enable: false,
                  mode: 'push',
                },
                resize: true,
              },
              modes: {
                grab: {
                  distance: 400,
                  line_linked: {
                    opacity: 1,
                  },
                },
                bubble: {
                  distance: 400,
                  size: 40,
                  duration: 2,
                  opacity: 8,
                  speed: 3,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
                push: {
                  particles_nb: 4,
                },
                remove: {
                  particles_nb: 2,
                },
              },
            },
            retina_detect: true,
            fullScreen: {
              zIndex: 0,
              enable: false,
            },
          }}
        />
      </div>
      <style jsx>{`
        .bg-repeat {
          background-image: url(/images/landing/bg-repeat.svg);
          background-size: 96px 64px;
          background-position: left top;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(100px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  );
}
