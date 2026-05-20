import { type FC } from 'react';
import { Box, Collapse, Group } from '@mantine/core';
import { CorsHint } from '@widgets/cors-hint';
import { PollToolbar } from '@widgets/poll-toolbar';
import { StatusBar } from '@widgets/status-bar';
import {
  PollIntervalSelect,
  PollToggleButton,
  useTrackerStore,
} from '@features/poll-control';

interface IMobileToolbarProps {
  expanded: boolean;
}

export const MobileToolbar: FC<IMobileToolbarProps> = ({ expanded }) => {
  const running = useTrackerStore((store) => store.running);

  return (
    <Box hiddenFrom="sm">
      {running && !expanded && (
        <Group
          gap="xs"
          align="flex-end"
          wrap="wrap"
        >
          <PollIntervalSelect />
          <PollToggleButton />
        </Group>
      )}

      <Collapse in={!running || expanded}>
        <PollToolbar />
        <StatusBar />
        <CorsHint />
      </Collapse>
    </Box>
  );
};
