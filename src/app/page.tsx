import { redirect } from 'next/navigation';
import { fetchNotes } from '@/src/lib/api/noteApi';

export default function RootPage() {
  redirect('/notes');
}