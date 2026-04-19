'use client';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';


export default function NotesClient() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(page, 12, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'center' }}>
        <SearchBox value={search} onChange={handleSearch} />
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Add Note
        </button>
      </div>

      {isLoading && !data ? (
        <p>Loading...</p>
      ) : (
        <>
          <NoteList notes={data?.notes || []} />
          
          {data && data.totalPages > 1 && (
            <Pagination 
              pageCount={data.totalPages} 
              onPageChange={handlePageChange} 
              forcePage={page - 1} 
            />
          )}
        </>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}