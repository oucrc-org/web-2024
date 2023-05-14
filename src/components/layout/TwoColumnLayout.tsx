import { ReactNode } from 'react';
import Container from '../Container';

interface TwoColumnLayoutProps {
  children: ReactNode;
  sidebarChildren?: ReactNode;
}

export default function TwoColumnLayout({
  children,
  sidebarChildren,
}: TwoColumnLayoutProps) {
  return (
    <Container className="pt-32">
      <div className="grid-cols-3 gap-8 pb-10 lg:grid xl:gap-12">
        <section className="row-span-2 bg-white pb-12 lg:col-span-2 lg:shadow-xl">
          {children}
        </section>
        <section className="border-t border-divider bg-white px-8 sm:px-16 md:px-24 lg:border-none lg:px-0 lg:pt-0 lg:shadow-xl">
          {sidebarChildren}
        </section>
      </div>
    </Container>
  );
}
