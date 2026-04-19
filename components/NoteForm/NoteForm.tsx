'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required('Required'),
  content: Yup.string().max(500),
  tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required('Required'),
});

const NoteForm = ({ onCancel }: { onCancel: () => void }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onCancel();
    },
  });

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Todo' as NoteTag }}
      validationSchema={validationSchema}
      onSubmit={(values) => mutate(values)}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title" className={css.label}>Title</label>
          <Field name="title" id="title" className={css.input} />
          <ErrorMessage name="title" component="div" className={css.error} />
        </div>
        <div className={css.actions}>
          <button type="button" onClick={onCancel} className={css.cancelButton}>Cancel</button>
          <button type="submit" disabled={isPending} className={css.submitButton}>
            {isPending ? 'Creating...' : 'Create note'}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;