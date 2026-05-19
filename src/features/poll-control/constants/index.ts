/** Длительность подсветки изменившегося атрибута в мс */
export const HIGHLIGHT_MS = 30_000;

/** Максимальное количество записей в changelog */
export const CHANGELOG_MAX = 30;

/** Начальный хост HA (пусто = использовать Vite proxy) */
export const INITIAL_API_HOST = '';

/** Путь к API Haier Evo в Home Assistant */
export const API_PATH = '/api/haier_evo';

/** Начальное состояние опроса */
export const INITIAL_RUNNING = false;

/** Варианты интервала опроса для Select */
export const POLL_INTERVAL_OPTIONS = [
  { value: '500', label: '500 мс' },
  { value: '1000', label: '1 с' },
  { value: '2000', label: '2 с' },
  { value: '5000', label: '5 с' },
  { value: '10000', label: '10 с' },
];

/** Начальный интервал опроса в мс */
export const INITIAL_POLL_INTERVAL = 5000;
