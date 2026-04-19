'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onCancel: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const validationSchema = Yup.object({
  title: Yup.string().min(3, 'Too short!').required('Required'),
  content: Yup.string().min(5, 'Too short!').required('Required'),
  tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required('Required'),
});

export default function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onCancel();
    },
  });

  const initialValues: FormValues = { 
    title: '', 
    content: '', 
    tag: 'Todo' 
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        mutation.mutate(values as FormValues);
      }}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <div className={css.fieldGroup}>
            <Field name="title" placeholder="Title" className={css.input} />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>
          
          <div className={css.fieldGroup}>
            <Field 
              name="content" 
              as="textarea" 
              placeholder="Content" 
              className={css.textarea} 
            />
            <ErrorMessage name="content" component="div" className={css.error} />
          </div>
          
          <div className={css.fieldGroup}>
            <Field name="tag" as="select" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="div" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="submit" disabled={mutation.isPending} className={css.submitBtn}>
              {mutation.isPending ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={onCancel} className={css.cancelBtn}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}