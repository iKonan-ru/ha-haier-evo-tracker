import { type FC } from 'react';
import { Box, Group, Paper, Title } from '@mantine/core';
import { AttributeList } from '@widgets/attribute-list';
import { ChangelogSidebar } from '@widgets/changelog-sidebar';
import { CorsHint } from '@widgets/cors-hint';
import { PollToolbar } from '@widgets/poll-toolbar';
import { StatusBar } from '@widgets/status-bar';
import { ThemeToggle } from '@widgets/theme-toggle';

export const TrackerPage: FC = () => (
  <Box style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <Paper
      component="header"
      withBorder
      shadow="sm"
      p="md"
      m="md"
      mb="0"
    >
      <Group
        gap="md"
        align="flex-start"
        justify="space-between"
      >
        <Title
          order={4}
          mb="xs"
        >
          Haier Evo :: трекер атрибутов
        </Title>
        <ThemeToggle />
      </Group>
      <PollToolbar />
      <StatusBar />
      <CorsHint />
    </Paper>

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
        w={320}
        style={{ flexShrink: 0, overflowY: 'auto' }}
      >
        <ChangelogSidebar />
      </Paper>
    </Box>
  </Box>
);
