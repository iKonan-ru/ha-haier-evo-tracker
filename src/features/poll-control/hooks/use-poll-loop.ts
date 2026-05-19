import { useEffect, useRef } from 'react';
import { useInterval } from '@mantine/hooks';
import { checkIsCorsError } from '@shared/lib/cors';
import type { AttributeValue } from '@shared/lib/diff';
import { HIGHLIGHT_MS } from '../constants';
import { useTrackerStore } from '../store';
import { poll } from '../utils';

export const usePollLoop = (): void => {
  const running = useTrackerStore((store) => store.running);
  const pollInterval = useTrackerStore((store) => store.pollInterval);
  const apiHost = useTrackerStore((store) => store.apiHost);
  const selectedDeviceName = useTrackerStore(
    (store) => store.selectedDeviceName,
  );
  const applyPollResult = useTrackerStore((store) => store.applyPollResult);
  const removeChangedKey = useTrackerStore((store) => store.removeChangedKey);
  const setStatus = useTrackerStore((store) => store.setStatus);
  const setCorsBlocked = useTrackerStore((store) => store.setCorsBlocked);

  const abortControllerRef = useRef<AbortController | null>(null);
  const previousSnapshotRef = useRef<Map<string, AttributeValue> | null>(null);
  const highlightTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const tick = async (): Promise<void> => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const result = await poll({
        apiHost,
        signal: controller.signal,
        previousSnapshot: previousSnapshotRef.current,
        selectedDeviceName,
      });

      if (!result.ok) {
        setStatus(result.message, true);

        return;
      }

      previousSnapshotRef.current = result.snapshot;
      applyPollResult({
        deviceId: result.deviceId,
        attributes: result.attributes,
        newChangelogEntries: result.newChangelogEntries,
        changedKeysToAdd: result.changedKeysToAdd,
        availableDevices: result.availableDevices,
      });
      setStatus(result.statusText, false);

      for (const codeKey of result.changedKeysToAdd) {
        const existing = highlightTimersRef.current.get(codeKey);

        if (existing !== undefined) {
          clearTimeout(existing);
        }

        const timer = setTimeout(() => {
          removeChangedKey(codeKey);
          highlightTimersRef.current.delete(codeKey);
        }, HIGHLIGHT_MS);

        highlightTimersRef.current.set(codeKey, timer);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }

      const isCors = checkIsCorsError(err);

      if (isCors) {
        setCorsBlocked(true);
        setStatus('CORS: запустите dev-сервер (npm run dev)', true);
      } else {
        setStatus(
          `Ошибка: ${err instanceof Error ? err.message : String(err)}`,
          true,
        );
      }
    }
  };

  const interval = useInterval(tick, pollInterval);

  useEffect(() => {
    if (running) {
      tick();
      interval.start();
    } else {
      interval.stop();
      abortControllerRef.current?.abort();
    }

    return () => {
      interval.stop();
      abortControllerRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, pollInterval, apiHost, selectedDeviceName]);

  useEffect(() => {
    previousSnapshotRef.current = null;
  }, [selectedDeviceName]);

  useEffect(
    () => () => {
      for (const timer of highlightTimersRef.current.values()) {
        clearTimeout(timer);
      }
    },
    [],
  );
};
