import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import type { Note, NoteTag } from '@/types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
}

export const checkSession = async () => {
  const cookieStore = cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};
export const getMe = async () => {
  const cookieStore = cookies();

  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const cookieStore = cookies();

  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
