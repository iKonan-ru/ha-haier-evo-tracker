import { fetchHaierEvo } from '@shared/api';

export const fetchDevices = async (
  apiHost: string,
  signal: AbortSignal,
): Promise<string[]> => {
  const data = await fetchHaierEvo(apiHost, signal);

  return data.devices.map((device) => device.device_name);
};
