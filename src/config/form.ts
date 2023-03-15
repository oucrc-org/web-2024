import { ContactFormInput, FormConfig, JoinFormInput } from '@/types/form';
import { serverEnv } from '@/config/server-env';

/**
 * 問い合わせフォームのGoogleフォームのID等
 * バリデーションは [@/types/form](../types/form.ts) 参照
 */
const contactFormConfig: FormConfig<ContactFormInput> = {
  formId: serverEnv.GOOGLE_FORM_ID_CONTACT,
  nameRecord: {
    name: 'entry.514745000',
    email: 'entry.821989733',
    body: 'entry.1197263570',
  },
};

/**
 * 入部フォームのGoogleフォームのID等
 * バリデーションは [@/types/form](../types/form.ts) 参照
 */
const joinFormConfig: FormConfig<JoinFormInput> = {
  formId: serverEnv.GOOGLE_FORM_ID_JOIN,
  nameRecord: {
    studentNumber: 'entry.1552183669',
    realName: 'entry.514745000',
    email: 'entry.821989733',
    phoneNumber: 'entry.793184820',
    nickname: 'entry.1050056731',
    hobby: 'entry.528663940',
    comment: 'entry.1197263570',
  },
};

/**
 * これをAPIルートで使うことで
 * 複数フォームの送信に対応
 */
export const FORMS = {
  contact: contactFormConfig,
  join: joinFormConfig,
};
