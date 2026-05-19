import { useRef, useState, type ChangeEvent, type FC } from 'react';
import { Button, Group, TextInput } from '@mantine/core';
import { useTrackerStore } from '../../store';
import { fetchDevices } from '../../utils';

export const ApiUrlInput: FC = () => {
  const apiHost = useTrackerStore((store) => store.apiHost);
  const setApiHost = useTrackerStore((store) => store.setApiHost);
  const setAvailableDevices = useTrackerStore(
    (store) => store.setAvailableDevices,
  );
  const setDeviceFetchError = useTrackerStore(
    (store) => store.setDeviceFetchError,
  );

  const [localHost, setLocalHost] = useState(apiHost);
  const [isApplying, setIsApplying] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLocalHost(event.currentTarget.value);
  };

  const handleApply = async (): Promise<void> => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setApiHost(localHost);
    setIsApplying(true);
    setDeviceFetchError(null);

    try {
      const devices = await fetchDevices(localHost, controller.signal);
      setAvailableDevices(devices);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }

      setDeviceFetchError(
        `Не удалось подключиться: ${err instanceof Error ? err.message : String(err)}`,
      );
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Group
      align="flex-end"
      gap="8"
    >
      <TextInput
        label="Хост Home Assistant"
        placeholder="http://homeassistant.local:8123"
        value={localHost}
        onChange={handleChange}
        autoComplete="url"
        name="ha-host"
        size="xs"
        w={260}
      />
      <Button
        size="xs"
        variant="default"
        loading={isApplying}
        onClick={handleApply}
      >
        Применить
      </Button>
    </Group>
  );
};
