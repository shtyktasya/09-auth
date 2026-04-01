import { nextServer } from './api';
import type { Note, NoteTag } from '@/types/note';
import type { User } from '@/types/user';


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

export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    params,
  });
  return data;
};

export interface NewNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}
export type RegisterRequest = {
  email: string;
  password: string;
};
export type LoginRequest = {
  email: string;
  password: string;
};
export type UpdateUser = {
  username?: string
}
export const createNote = async (note: NewNoteData): Promise<Note> => {
  const { data } = await nextServer.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};
export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};
export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};
export const updateMe = async (payload: UpdateUser) => {
  const res = await nextServer.patch<User>('/users/me', payload)
  return res.data
}
export async function logout() {
  const { data } = await nextServer.post("/auth/logout");
  return data;
}
export const checkSession = async () => {
  const { data } = await nextServer.get('/auth/session');
  return data;
};