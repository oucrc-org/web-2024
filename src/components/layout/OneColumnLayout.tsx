import Container from '../Container';
import { ReactNode } from 'react';

interface OneColumnLayoutProps {
  children: ReactNode;
}

export default function OneColumnLayout({ children }: OneColumnLayoutProps) {
  return (
    <Container className="flex flex-col gap-y-16 pt-24 lg:pt-32 pb-24">
      {children}
    </Container>
  );
}
