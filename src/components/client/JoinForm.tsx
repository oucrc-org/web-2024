'use client';
import { FormProvider } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTypeSafeForm } from '@/hooks/useTypeSafeForm';
import { joinFormInput, JoinFormInput } from '@/types/form';
import InputControl from './InputControl';
import HeadingH1 from '../HeadingH1';

export default function JoinForm() {
  const apiPath = '/api/form/join';
  // 以降のフォームコンポーネントに渡す型
  type FormType = JoinFormInput;
  const form = useTypeSafeForm<FormType>({
    resolver: zodResolver(joinFormInput),
    defaultValues: {
      studentNumber: '',
      realName: '',
      email: '',
      phoneNumber: '',
      nickname: '',
      hobby: '',
      comment: '',
    },
  });
  const router = useRouter();
  const onSubmit = async (data: FormType) => {
    const body = JSON.stringify(data);
    return await toast.promise(
      fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }).then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          router.push('/');
        }
      }),
      {
        loading: '通信中です...',
        success: '申込みが完了しました。',
        error: (e) => {
          console.error(e);
          return '通信に失敗しました。';
        },
      }
    );
  };
  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="card">
            <HeadingH1>入部フォーム</HeadingH1>
            <div className="flex flex-col gap-y-6">
              <InputControl<FormType>
                name="studentNumber"
                type="text"
                label="学籍番号 (半角)"
                required
                placeholder="00X00000"
              />
              <InputControl<FormType>
                name="realName"
                type="text"
                label="名前"
                required
                placeholder="電算 太郎"
              />
              <InputControl<FormType>
                name="email"
                label="大学のメールアドレス"
                required
                placeholder="example@okayama-u.ac.jp"
              />
              <InputControl<FormType>
                name="phoneNumber"
                label="電話番号 (半角)"
                required
                placeholder="000-0000-0000"
              />
              <InputControl<FormType>
                name="nickname"
                type="text"
                label="ニックネーム"
                required
                placeholder="タロー"
              />
              <InputControl<FormType>
                name="hobby"
                label="趣味"
                placeholder="電子工作,アプリ開発,ゲーム,etc..."
              />
              <InputControl<FormType>
                name="comment"
                label="一言コメント"
                placeholder="任意"
              />
            </div>
            <div className="card-actions">
              <button
                disabled={!form.formState.isValid}
                type="submit"
                className="btn"
              >
                送信
              </button>
            </div>
            <p className="mt-16 text-sm leading-7">
              フォームから送信できない場合は、
              <a
                href={apiPath}
                className="font-bold text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                こちら
              </a>
              から送信をお願いします。
            </p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
