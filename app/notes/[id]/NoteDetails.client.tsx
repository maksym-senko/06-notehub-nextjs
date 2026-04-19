'use client';
import { Note } from '@/types/note';

export default function NoteDetailsClient({ note }: { note: Note }) {
  return (
    <div className="p-5 text-white">
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <p className="mt-4">{note.content}</p>
    </div>
  );
}