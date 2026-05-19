import type { IHaierEvoResponse } from './types';

const HAIER_EVO_PATH = '/api/haier_evo';

export const fetchHaierEvo = async (
  apiHost: string,
  signal: AbortSignal,
): Promise<IHaierEvoResponse> => {
  const headers: HeadersInit = apiHost ? { 'X-HA-Target': apiHost } : {};
  const res = await fetch(HAIER_EVO_PATH, { signal, headers });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json() as Promise<IHaierEvoResponse>;
};
