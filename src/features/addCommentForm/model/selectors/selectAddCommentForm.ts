import { buildSelector } from '@/shared/lib/store';

export const [useAddCommentFormTextSelector, selectAddCommentFormText] =
    buildSelector((state) => state?.addCommentForm?.text ?? '');

export const [useAddCommentFormErrorSelector, selectAddCommentFormError] =
    buildSelector((state) => state?.addCommentForm?.error);
