import { z } from 'zod';

const zStringMinMax = (min: number, max: number) =>
  z.string().refine((str) => str.length >= min && str.length <= max, {
    message: `${min}~${max}文字にしてください`,
  });

/**
 * コンポーネントのnameと、
 * GoogleフォームにFormDataを送信する際に使うnameの対応および
 * フォームのID
 * @typeParam {T} zodで作ったフォーム用スキーマの型
 */
export type FormConfig<T> = {
  formId: string;
  nameRecord: Record<keyof T, string>;
};

/**
 * 問い合わせフォームのバリデーション用定義
 * GoogleフォームのID等は [@/config/form](../config/form.ts) 参照
 */
export const contactFormInput = z.object({
  name: zStringMinMax(2, 20),
  email: z.string().email('有効なメールアドレスを入力してください。'),
  body: zStringMinMax(10, 200),
});

export type ContactFormInput = z.infer<typeof contactFormInput>;

/**
 * 入部フォームのバリデーション用定義
 * GoogleフォームのID等は [@/config/form](../config/form.ts) 参照
 */
export const joinFormInput = z.object({
  studentNumber: z
    .string()
    .regex(/^[a-zA-Z0-9]{8}$/, '有効な学籍番号を入力してください。'),
  realName: zStringMinMax(2, 20),
  email: z.string().regex(
    // サブドメインも許可する
    /^([a-z0-9_\.-]+)@(([a-z0-9_\.-]+)\.)?okayama-u.ac.jp/,
    '有効な大学のメールアドレスを入力してください。'
  ),
  phoneNumber: z
    .string()
    // ここは厳格でなくていい
    .regex(/^0[-0-9]{9,12}$/, '有効な電話番号を入力してください。'),
  nickname: zStringMinMax(2, 20),
  // 空欄許可には `z.literal('')` が必要 https://github.com/colinhacks/zod/issues/310#issuecomment-794533682
  hobby: zStringMinMax(10, 200).optional().or(z.literal('')),
  comment: zStringMinMax(10, 200).optional().or(z.literal('')),
});

export type JoinFormInput = z.infer<typeof joinFormInput>;
