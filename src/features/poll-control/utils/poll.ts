import {
  formatValue,
  normalizeAttributes,
  type IChangelogEntry,
} from '@entities/attribute';
import { fetchHaierEvo } from '@shared/api';
import { diffAttributes, type AttributeValue } from '@shared/lib/diff';
import { formatTime } from '@shared/lib/utils';

interface IPollParams {
  apiHost: string;
  signal: AbortSignal;
  previousSnapshot: Map<string, AttributeValue> | null;
  selectedDeviceName: string | null;
}

interface IPollSuccess {
  ok: true;
  deviceId: string;
  attributes: ReturnType<typeof normalizeAttributes>;
  newChangelogEntries: IChangelogEntry[];
  changedKeysToAdd: string[];
  availableDevices: string[];
  snapshot: Map<string, AttributeValue>;
  statusText: string;
}

interface IPollError {
  ok: false;
  isCors: boolean;
  message: string;
}

export type PollResult = IPollSuccess | IPollError;

export const poll = async ({
  apiHost,
  signal,
  previousSnapshot,
  selectedDeviceName,
}: IPollParams): Promise<PollResult> => {
  const data = await fetchHaierEvo(apiHost, signal);

  const availableDevices = data.devices.map((d) => d.device_name);

  const device = selectedDeviceName
    ? (data.devices.find((d) => d.device_name === selectedDeviceName) ?? null)
    : (data.devices[0] ?? null);

  if (!device) {
    return { ok: false, isCors: false, message: 'Устройства не найдены' };
  }

  const attributes = normalizeAttributes(device);
  const backendStatus = device.backend_data?.status ?? '—';
  const { changedKeys, changes, snapshot } = diffAttributes(
    previousSnapshot,
    attributes,
  );

  const now = new Date().toISOString();
  const newChangelogEntries: IChangelogEntry[] = changes.map(
    ({ codeKey, oldVal, newVal }) => {
      const attr = attributes.find((a) => a.codeKey === codeKey);
      const name = attr?.name ?? 'unknown';
      const newLabel = attr
        ? formatValue({
            ...attr,
            current: newVal as string | number | null | undefined,
          })
        : String(newVal);

      return {
        at: now,
        code: attr?.code ?? -1,
        codeKey,
        name,
        oldVal,
        newVal,
        newLabel,
      };
    },
  );

  const time = formatTime(new Date());
  const changedCount = changedKeys.size;
  const statusText =
    `${device.device_name} · Опрос ${time} · атрибутов ${attributes.length} · статус ${backendStatus}` +
    (changedCount ? ` · изменилось: ${changedCount}` : '');

  return {
    ok: true,
    deviceId: device.device_id,
    attributes,
    newChangelogEntries,
    changedKeysToAdd: [...changedKeys],
    availableDevices,
    snapshot,
    statusText,
  };
};
