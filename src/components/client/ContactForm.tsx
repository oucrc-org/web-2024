'use client';
import { FormProvider } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTypeSafeForm } from '@/hooks/useTypeSafeForm';
import { contactFormInput, ContactFormInput } from '@/types/form';
import InputControl from './InputControl';
import HeadingH1 from '../HeadingH1';
import { useState } from 'react';

export default function ContactForm() {
  const apiPath = '/api/form/contact';
  // 以降のフォームコンポーネントに渡す型
  type FormType = ContactFormInput;
  const form = useTypeSafeForm<FormType>({
    resolver: zodResolver(contactFormInput),
    defaultValues: {
      name: '',
      email: '',
      body: '',
    },
  });
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async (data: FormType) => {
    setSubmitting(true);
    const body = JSON.stringify(data);
    return await toast.promise(
      fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }).then((response) => {
        setSubmitting(false);
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          router.push('/');
        }
      }),
      {
        loading: '通信中です...',
        success: 'お問い合わせありがとうございました。',
        error: (e) => {
          console.error(e);
          return '通信に失敗しました。';
        },
      },
      { duration: 10000 }
    );
  };
  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="card">
            <HeadingH1>お問い合わせ</HeadingH1>
            <div className="flex flex-col gap-y-6">
              <InputControl<FormType>
                name="name"
                type="text"
                label="名前"
                required
                placeholder="電算 太郎"
              />
              <InputControl<FormType>
                name="email"
                label="メールアドレス"
                required
                placeholder="example@okayama-u.ac.jp"
              />
              <InputControl<FormType>
                name="body"
                label="本文"
                required
                placeholder="お問い合わせ内容をご記入下さい。"
              />
            </div>
            <div className="card-actions justify-center pt-8">
              <button
                disabled={!form.formState.isValid || submitting}
                type="submit"
                className="btn-lg btn"
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
