import { create, type StoreApi, type UseBoundStore } from 'zustand';
import {
  loadNotes,
  saveNotes,
  type INote,
  type INotesData,
} from '@shared/lib/storage';
import { generateUuid } from '@shared/lib/utils';

interface INotesState {
  /** Данные заметок (загружаются из localStorage) */
  notesData: INotesData;
  /** codeKey атрибута с открытой формой заметки */
  expandedNoteKey: string | null;
}

interface INotesActions {
  setExpandedNoteKey(key: string | null): void;
  addNote(input: {
    codeKey: string;
    code: number;
    text: string;
    valueAtSave: string | number | null;
    valueLabel: string | null;
  }): void;
  mergeImport(imported: INotesData): { added: number };
  setDeviceId(deviceId: string | null): void;
  deleteNote(id: string): void;
}

export const useNotesStore: UseBoundStore<
  StoreApi<INotesState & INotesActions>
> = create((set, get) => ({
  notesData: loadNotes(),
  expandedNoteKey: null,

  setExpandedNoteKey: (expandedNoteKey) => set({ expandedNoteKey }),

  addNote: ({ codeKey, code, text, valueAtSave, valueLabel }) => {
    const note: INote = {
      id: generateUuid(),
      code,
      codeKey,
      text,
      createdAt: new Date().toISOString(),
      valueAtSave,
      valueLabel,
    };
    const notesData: INotesData = {
      ...get().notesData,
      notes: [...get().notesData.notes, note],
    };
    saveNotes(notesData);
    set({ notesData });
  },

  mergeImport: (imported) => {
    const existingIds = new Set(get().notesData.notes.map((n) => n.id));
    const newNotes = imported.notes.filter((n) => !existingIds.has(n.id));
    const notesData: INotesData = {
      deviceId: imported.deviceId ?? get().notesData.deviceId,
      notes: [...get().notesData.notes, ...newNotes],
    };
    saveNotes(notesData);
    set({ notesData });

    return { added: newNotes.length };
  },

  setDeviceId: (deviceId) => {
    const notesData = { ...get().notesData, deviceId };
    saveNotes(notesData);
    set({ notesData });
  },

  deleteNote: (id) => {
    const notesData: INotesData = {
      ...get().notesData,
      notes: get().notesData.notes.filter((n) => n.id !== id),
    };
    saveNotes(notesData);
    set({ notesData });
  },
}));
