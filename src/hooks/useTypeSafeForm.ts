import {
  useForm,
  UseFormProps,
  UseFormReturn,
  FieldValues,
} from 'react-hook-form';

/**
 * defaultValueを厳格にしたuseForm
 * @see https://zenn.dev/yuitosato/articles/292f13816993ef
 */
const useTypeSafeForm = <TFormValues extends FieldValues>(
  props: UseFormProps<TFormValues> & {
    defaultValues: TFormValues;
  }
): UseFormReturn<TFormValues> => {
  /**
   * フォーカス外す度にバリデーションする
   */
  return useForm({ mode: 'onBlur', ...props });
};

export { useTypeSafeForm };
