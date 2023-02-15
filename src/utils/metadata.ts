import { metadata } from '@/app/layout';
import { Metadata } from 'next';

/**
 * レイアウトのサイト名と現在のタイトルを合成する
 * `titleTemplate` が実装されたら不要
 */
export const buildMetadata = ({
  title,
  ...rest
}: {
  title: string;
}): Metadata => {
  return {
    ...rest,
    title: `${title} - ${metadata.title}`,
  };
};
