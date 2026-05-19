import { useEffect } from 'react';
import { useTrackerStore } from '../store';
import { fetchDevices } from '../utils';

export const useDeviceFetch = (): void => {
  const apiHost = useTrackerStore((store) => store.apiHost);
  const setAvailableDevices = useTrackerStore(
    (store) => store.setAvailableDevices,
  );
  const setDeviceFetchError = useTrackerStore(
    (store) => store.setDeviceFetchError,
  );

  useEffect(() => {
    const controller = new AbortController();

    fetchDevices(apiHost, controller.signal)
      .then((devices) => {
        setDeviceFetchError(null);
        setAvailableDevices(devices);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        setDeviceFetchError(
          `Не удалось получить список устройств: ${err instanceof Error ? err.message : String(err)}`,
        );
      });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
