import { type FC } from 'react';
import { Button } from '@mantine/core';
import { useTrackerStore } from '../../store';

export const PollToggleButton: FC = () => {
  const running = useTrackerStore((store) => store.running);
  const selectedDeviceName = useTrackerStore(
    (store) => store.selectedDeviceName,
  );
  const setRunning = useTrackerStore((store) => store.setRunning);

  const handleClick = (): void => {
    setRunning(!running);
  };

  return (
    <Button
      variant="default"
      size="xs"
      onClick={handleClick}
      disabled={!selectedDeviceName}
      mt={18}
    >
      {running ? 'Пауза' : 'Старт'}
    </Button>
  );
};
