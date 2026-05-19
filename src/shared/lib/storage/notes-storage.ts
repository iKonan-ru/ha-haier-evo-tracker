import { STORAGE_KEY } from './constants';
import type { INotesData } from './types';

const EMPTY_NOTES_DATA: INotesData = { deviceId: null, notes: [] };

export const loadNotes = (): INotesData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return EMPTY_NOTES_DATA;
    }

    const parsed = JSON.parse(raw) as {
      deviceId?: string | null;
      notes?: unknown;
    };

    return {
      deviceId: parsed.deviceId ?? null,
      notes: Array.isArray(parsed.notes) ? parsed.notes : [],
    };
  } catch {
    return EMPTY_NOTES_DATA;
  }
};

export const saveNotes = (data: INotesData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
