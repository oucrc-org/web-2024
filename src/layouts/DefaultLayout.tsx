import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ReactNode } from 'react';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow pt-16">{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
