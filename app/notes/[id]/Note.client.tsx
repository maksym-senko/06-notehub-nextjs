'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/noteApi';

function NoteDetailsClient() {
  const params = useParams();
  const id = params?.id as string;

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading note details...</p>;
  if (isError) return <p>Note not found.</p>;
  if (!note) return null;

  return (
    <article style={{ padding: '20px' }}>
      <h1>{note.title}</h1>
      <span style={{ background: '#eee', padding: '4px 8px' }}>{note.tag}</span>
      <p style={{ marginTop: '20px' }}>{note.content}</p>
    </article>
  );
}

export default NoteDetailsClient;