import { useRef, useState } from 'react';
import { useTrackerStore } from '../store';
import { fetchDevices } from '../utils';

interface IUseApplyHost {
  isApplying: boolean;
  applyHost: (host: string) => void;
}

export const useApplyHost = (): IUseApplyHost => {
  const setApiHost = useTrackerStore((store) => store.setApiHost);
  const setAvailableDevices = useTrackerStore(
    (store) => store.setAvailableDevices,
  );
  const setDeviceFetchError = useTrackerStore(
    (store) => store.setDeviceFetchError,
  );

  const [isApplying, setIsApplying] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const applyHost = (host: string): void => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setApiHost(host);
    setIsApplying(true);
    setDeviceFetchError(null);

    fetchDevices(host, controller.signal)
      .then((devices) => {
        setAvailableDevices(devices);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        setDeviceFetchError(
          `Не удалось подключиться: ${err instanceof Error ? err.message : String(err)}`,
        );
      })
      .finally(() => {
        setIsApplying(false);
      });
  };

  return { isApplying, applyHost };
};
