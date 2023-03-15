'use client';
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

/** 一度だけフェードイン @see https://stackoverflow.com/a/59596406 */
export default function FadeIn({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    if (domRef.current) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          domRef.current && observer.unobserve(domRef.current);
        }
      });
      observer.observe(domRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div
      ref={domRef}
      className={twMerge(
        `translate-y-[20vh]`,
        isVisible ? 'opacity-1 transform-none' : 'opacity-0',
        className
      )}
      style={{
        transition: 'opacity 0.2s ease-in, transform 0.6s ease-out',
        willChange: 'opacity, visibility',
      }}
      {...props}
    >
      {children}
    </div>
  );
}
