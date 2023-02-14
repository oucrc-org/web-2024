import DefaultLayout from '@/layouts/DefaultLayout';
import { NextPageWithLayout } from '@/types/next';

const Home: NextPageWithLayout = () => {
  return <></>;
};

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;
export default Home;
