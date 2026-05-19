import { type FC } from 'react';
import { Select } from '@mantine/core';
import { POLL_INTERVAL_OPTIONS } from '../../constants';
import { useTrackerStore } from '../../store';

export const PollIntervalSelect: FC = () => {
  const pollInterval = useTrackerStore((store) => store.pollInterval);
  const setPollInterval = useTrackerStore((store) => store.setPollInterval);

  const handleChange = (value: string | null): void => {
    if (value !== null) {
      setPollInterval(Number(value));
    }
  };

  return (
    <Select
      label="Интервал"
      data={POLL_INTERVAL_OPTIONS}
      value={String(pollInterval)}
      onChange={handleChange}
      size="xs"
      w={100}
      allowDeselect={false}
    />
  );
};
