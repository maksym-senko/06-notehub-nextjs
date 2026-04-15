'use client';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/src/lib/api/noteApi';
import type { Note } from '@/src/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          <div className={css.content}>
            <h2>{title}</h2>
            <p>{content}</p>
            <span className={css.tag}>{tag}</span>
          </div>
          <div className={css.actions}>
            <Link href={`/notes/${id}`} className={css.detailsBtn}>
              View details
            </Link>
            <button type="button" onClick={() => mutate(id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;