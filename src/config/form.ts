import { ContactFormInput, FormConfig, JoinFormInput } from '@/types/form';
import { env } from '@/utils/server-env';

const contactFormConfig: FormConfig<ContactFormInput> = {
  formId: env.GOOGLE_FORM_ID_CONTACT,
  nameRecord: {
    name: 'entry.514745000',
    email: 'entry.821989733',
    body: 'entry.1197263570',
  },
};
const joinFormConfig: FormConfig<JoinFormInput> = {
  formId: env.GOOGLE_FORM_ID_JOIN,
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

export const FORMS = {
  contact: contactFormConfig,
  join: joinFormConfig,
};
