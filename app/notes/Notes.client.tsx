'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/noteApi';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteForm from '@/components/NoteForm/NoteForm';

function NotesClient() {
  const [filter, setFilter] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', filter],
    queryFn: () => fetchNotes(1, 12, filter),
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p style={{ color: 'red' }}>Error loading notes. Check token in .env.local</p>;

  const notesArray = data?.notes || [];

  return (
    <main style={{ padding: '20px' }}>
      <h1>My Notes</h1>
      <NoteForm onCancel={() => {}} /> 
      <SearchBox value={filter} onChange={setFilter} />
      <NoteList notes={notesArray} />
    </main>
  );
}

export default NotesClient;