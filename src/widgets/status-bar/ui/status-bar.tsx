import { type FC } from 'react';
import { Text } from '@mantine/core';
import { useTrackerStore } from '@features/poll-control';

export const StatusBar: FC = () => {
  const statusText = useTrackerStore((store) => store.statusText);
  const isError = useTrackerStore((store) => store.isError);
  const deviceFetchError = useTrackerStore((store) => store.deviceFetchError);

  if (deviceFetchError !== null) {
    return (
      <Text
        size="xs"
        c="red"
      >
        {deviceFetchError}
      </Text>
    );
  }

  return (
    <Text
      size="xs"
      c={isError ? 'red' : 'dimmed'}
    >
      {statusText}
    </Text>
  );
};
