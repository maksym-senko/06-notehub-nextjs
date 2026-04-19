import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const noteInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

noteInstance.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search: string = "",
): Promise<FetchNotesResponse> => {
  const { data } = await noteInstance.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search },
  });
  return data;
};

const createNote = async (note: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const { data } = await noteInstance.post<Note>("/notes", note);
  return data;
};

const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await noteInstance.delete<Note>(`/notes/${id}`);
  return data;
};

export { fetchNotes, createNote, deleteNote };