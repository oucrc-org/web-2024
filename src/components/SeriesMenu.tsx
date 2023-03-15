import { getAllSerieses } from '@/utils/micro-cms';
import HeadingH2 from './HeadingH2';
import SeriesButton from './SeriesButton';

interface SeriesMenuProps {
  currentSeriesId?: string;
}

export default async function SeriesMenu({ currentSeriesId }: SeriesMenuProps) {
  const categories = await getAllSerieses();
  return (
    <>
      <div className="flex flex-col gap-y-3 px-6 sm:px-0">
        <HeadingH2>シリーズ</HeadingH2>
        <div className="flex flex-wrap gap-2">
          {categories.contents.map((series) => (
            <SeriesButton
              key={series.id}
              series={series}
              className={currentSeriesId === series.id ? 'btn-active' : ''}
              prefetch={false} // メニュー上でカーソルを動かしただけで通信してしまうため、プリフェッチ無効化
            />
          ))}
        </div>
      </div>
    </>
  );
}
