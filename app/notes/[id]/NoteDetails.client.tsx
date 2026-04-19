'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { Note } from '@/types/note';

export default function NoteDetailsClient({ id }: { id: string }) {
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading note details...</p>;
  if (isError || !note) return <p>Error: Note not found.</p>;

  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <h1>{note.title}</h1>
      <div style={{ background: '#444', display: 'inline-block', padding: '4px 8px', borderRadius: '4px' }}>
        {note.tag}
      </div>
      <p style={{ marginTop: '1rem' }}>{note.content}</p>
      <hr />
      <small>Created: {new Date(note.createdAt).toLocaleString()}</small>
    </div>
  );
}