import { twMerge } from 'tailwind-merge';

const Hamburger = ({ opened }: { opened: boolean }) => {
  return (
    <div className="flex w-8 flex-col gap-2">
      <span className={twMerge('h-1 w-full bg-gray-500', opened && 'hidden')} />
      <span
        className={twMerge('h-1 w-full bg-gray-500', opened && 'rotate-45')}
      />
      <span
        className={twMerge(
          'h-1 w-full bg-gray-500 -mt-3',
          opened ? '-rotate-45' : 'hidden'
        )}
      />
      <span className={twMerge('h-1 w-full bg-gray-500', opened && 'hidden')} />
    </div>
  );
};

export default Hamburger;
