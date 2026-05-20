import { useState, type FC } from 'react';
import { Box, Button, Drawer, Group, Paper, Title } from '@mantine/core';
import { ChangelogSidebar } from '@widgets/changelog-sidebar';
import { CorsHint } from '@widgets/cors-hint';
import { PollToolbar } from '@widgets/poll-toolbar';
import { StatusBar } from '@widgets/status-bar';
import { ThemeToggle } from '@widgets/theme-toggle';
import { useTrackerStore } from '@features/poll-control';
import { MobileToolbar } from './mobile-toolbar';

export const TrackerHeader: FC = () => {
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [headerExpanded, setHeaderExpanded] = useState(false);
  const changelog = useTrackerStore((store) => store.changelog);
  const running = useTrackerStore((store) => store.running);

  return (
    <>
      <Paper
        component="header"
        withBorder
        shadow="sm"
        p="md"
        m="md"
        mb="0"
      >
        <Group
          gap="xs"
          align="center"
          justify="space-between"
          mb="xs"
        >
          <Title order={4}>Haier Evo :: трекер атрибутов</Title>

          <Group gap="xs">
            <Button
              hiddenFrom="sm"
              variant="default"
              size="xs"
              onClick={() => setChangelogOpen(true)}
            >
              Изменения{changelog.length > 0 ? ` (${changelog.length})` : ''}
            </Button>

            {running && (
              <Button
                hiddenFrom="sm"
                variant="subtle"
                size="xs"
                px={6}
                onClick={() => setHeaderExpanded((v) => !v)}
              >
                {headerExpanded ? '▴' : '▾'}
              </Button>
            )}
            <ThemeToggle />
          </Group>
        </Group>

        <Box visibleFrom="sm">
          <PollToolbar />
          <StatusBar />
          <CorsHint />
        </Box>

        <MobileToolbar expanded={headerExpanded} />
      </Paper>

      <Drawer
        opened={changelogOpen}
        onClose={() => setChangelogOpen(false)}
        position="right"
        size="xs"
        hiddenFrom="sm"
      >
        <ChangelogSidebar />
      </Drawer>
    </>
  );
};
