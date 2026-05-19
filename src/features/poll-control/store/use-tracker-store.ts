import { create, type StoreApi, type UseBoundStore } from 'zustand';
import type { IAttribute, IChangelogEntry } from '@entities/attribute';
import {
  CHANGELOG_MAX,
  INITIAL_API_HOST,
  INITIAL_POLL_INTERVAL,
  INITIAL_RUNNING,
} from '../constants';

interface ITrackerState {
  /** Активен ли опрос */
  running: boolean;
  /** Интервал опроса в мс */
  pollInterval: number;
  /** Хост HA (пусто = использовать Vite proxy) */
  apiHost: string;
  /** Список имён устройств из последнего ответа API */
  availableDevices: string[];
  /** Выбранное устройство (null = первое из списка) */
  selectedDeviceName: string | null;
  /** ID устройства (null до первого успешного ответа) */
  deviceId: string | null;
  /** Текущие атрибуты устройства */
  attributes: IAttribute[];
  /** Множество codeKey атрибутов, подсвеченных как изменившиеся */
  changedKeys: Set<string>;
  /**
   * Порядок изменений за сессию: первый элемент - последний изменённый.
   * Сбрасывается при смене устройства; используется для сортировки списка.
   */
  changedOrder: string[];
  /** Последние изменения */
  changelog: IChangelogEntry[];
  /** Текст строки статуса */
  statusText: string;
  /** Признак ошибки для красного цвета статуса */
  isError: boolean;
  /** Признак CORS-блокировки */
  corsBlocked: boolean;
  /** Ошибка последнего запроса списка устройств (null = нет ошибки) */
  deviceFetchError: string | null;
}

interface ITrackerActions {
  setRunning(running: boolean): void;
  setPollInterval(interval: number): void;
  setApiHost(host: string): void;
  setSelectedDeviceName(name: string | null): void;
  applyPollResult(payload: {
    deviceId: string;
    attributes: IAttribute[];
    newChangelogEntries: IChangelogEntry[];
    changedKeysToAdd: string[];
    availableDevices: string[];
  }): void;
  setAvailableDevices(devices: string[]): void;
  setDeviceFetchError(error: string | null): void;
  removeChangedKey(codeKey: string): void;
  setStatus(text: string, isError: boolean): void;
  setCorsBlocked(blocked: boolean): void;
}

export const useTrackerStore: UseBoundStore<
  StoreApi<ITrackerState & ITrackerActions>
> = create((set) => ({
  running: INITIAL_RUNNING,
  pollInterval: INITIAL_POLL_INTERVAL,
  apiHost: INITIAL_API_HOST,
  availableDevices: [],
  selectedDeviceName: null,
  deviceId: null,
  attributes: [],
  changedKeys: new Set(),
  changedOrder: [],
  changelog: [],
  statusText: 'Ожидание…',
  isError: false,
  corsBlocked: false,
  deviceFetchError: null,

  setRunning: (running) => set({ running }),

  setPollInterval: (pollInterval) => set({ pollInterval }),

  setApiHost: (apiHost) => set({ apiHost }),

  setSelectedDeviceName: (selectedDeviceName) =>
    set({
      selectedDeviceName,
      running: selectedDeviceName !== null,
      attributes: [],
      changedKeys: new Set(),
      changedOrder: [],
      changelog: [],
      deviceId: null,
    }),

  applyPollResult: ({
    deviceId,
    attributes,
    newChangelogEntries,
    changedKeysToAdd,
    availableDevices,
  }) =>
    set((state) => {
      const changedKeys = new Set(state.changedKeys);

      for (const key of changedKeysToAdd) {
        changedKeys.add(key);
      }

      const incoming = new Set(changedKeysToAdd);
      const changedOrder = [
        ...changedKeysToAdd,
        ...state.changedOrder.filter((key) => !incoming.has(key)),
      ];

      const changelog = [...newChangelogEntries, ...state.changelog].slice(
        0,
        CHANGELOG_MAX,
      );

      return {
        deviceId,
        attributes,
        changedKeys,
        changedOrder,
        changelog,
        availableDevices,
      };
    }),

  setAvailableDevices: (availableDevices) => set({ availableDevices }),

  setDeviceFetchError: (deviceFetchError) => set({ deviceFetchError }),

  removeChangedKey: (codeKey) =>
    set((state) => {
      const changedKeys = new Set(state.changedKeys);
      changedKeys.delete(codeKey);

      return { changedKeys };
    }),

  setStatus: (statusText, isError) => set({ statusText, isError }),

  setCorsBlocked: (corsBlocked) => set({ corsBlocked }),
}));
