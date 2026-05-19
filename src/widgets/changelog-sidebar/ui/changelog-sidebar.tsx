import { type FC } from 'react';
import { Paper, Stack, Text, Title } from '@mantine/core';
import { useTrackerStore } from '@features/poll-control';

export const ChangelogSidebar: FC = () => {
  const changelog = useTrackerStore((store) => store.changelog);

  return (
    <Stack gap="xs">
      <Title order={5}>Последние изменения</Title>
      {changelog.length === 0 ? (
        <Text
          size="sm"
          c="dimmed"
          fs="italic"
        >
          Пока нет изменений
        </Text>
      ) : (
        changelog.map((entry) => {
          const name = entry.name !== 'unknown' ? ` (${entry.name})` : '';

          return (
            <Paper
              key={`${entry.at}-${entry.codeKey}`}
              withBorder
              p="xs"
            >
              <Text
                size="xs"
                fw={600}
              >
                code {entry.code}
                {name}
              </Text>
              <Text
                size="xs"
                c="dimmed"
              >
                {entry.oldVal ?? '—'} → {entry.newVal ?? '—'}
                {entry.newLabel ? ` (${entry.newLabel})` : ''}
              </Text>
              <Text
                component="time"
                size="xs"
                c="gray.5"
              >
                {new Date(entry.at).toLocaleTimeString('ru-RU')}
              </Text>
            </Paper>
          );
        })
      )}
    </Stack>
  );
};
