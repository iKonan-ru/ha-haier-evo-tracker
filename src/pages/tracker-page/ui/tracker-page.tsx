import { type FC } from 'react';
import { Box, Paper } from '@mantine/core';
import { AttributeList } from '@widgets/attribute-list';
import { ChangelogSidebar } from '@widgets/changelog-sidebar';
import { TrackerHeader } from './tracker-header';

export const TrackerPage: FC = () => (
  <Box style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <TrackerHeader />

    <Box style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <Box
        component="main"
        p="md"
        style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}
      >
        <AttributeList />
      </Box>

      <Paper
        component="aside"
        withBorder
        shadow="sm"
        p="md"
        m="md"
        w={300}
        visibleFrom="sm"
        style={{ flexShrink: 0, overflowY: 'auto' }}
      >
        <ChangelogSidebar />
      </Paper>
    </Box>
  </Box>
);
