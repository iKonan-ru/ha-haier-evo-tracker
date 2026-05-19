import { type FC } from 'react';
import { Group } from '@mantine/core';
import { ExportImportButtons } from '@features/notes';
import {
  ApiUrlInput,
  DeviceSelect,
  PollIntervalSelect,
  PollToggleButton,
} from '@features/poll-control';

export const PollToolbar: FC = () => (
  <Group
    gap="md"
    align="flex-end"
    wrap="wrap"
  >
    <ApiUrlInput />
    <DeviceSelect />
    <PollIntervalSelect />
    <PollToggleButton />
    <ExportImportButtons />
  </Group>
);
