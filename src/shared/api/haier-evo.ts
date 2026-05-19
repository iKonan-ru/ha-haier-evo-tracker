import type { IHaierEvoResponse } from './types';

const HAIER_EVO_PATH = '/api/haier_evo';

export const fetchHaierEvo = async (
  apiHost: string,
  signal: AbortSignal,
): Promise<IHaierEvoResponse> => {
  const url = apiHost ? `${apiHost}${HAIER_EVO_PATH}` : HAIER_EVO_PATH;
  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json() as Promise<IHaierEvoResponse>;
};
