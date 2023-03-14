'use client';
import { Toaster } from 'react-hot-toast';

/** クライアントコンポーネントとして扱わせるために分離 */
export default function ReactHotToast() {
  return <Toaster />;
}
