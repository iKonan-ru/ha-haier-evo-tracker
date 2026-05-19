import { type FC } from 'react';
import { Alert, Code, Text } from '@mantine/core';
import { useTrackerStore } from '@features/poll-control';

export const CorsHint: FC = () => {
  const corsBlocked = useTrackerStore((store) => store.corsBlocked);

  if (!corsBlocked) {
    return null;
  }

  return (
    <Alert
      color="red"
      variant="light"
      mt="xs"
    >
      <Text size="sm">
        Браузер блокирует запрос к Home Assistant с этого origin. Не открывайте
        файл напрямую (<Code>file://</Code>). Запустите dev-сервер:
        <Code> npm run dev</Code>, откройте{' '}
        <Text
          component="a"
          href="http://localhost:5173"
          size="sm"
        >
          http://localhost:5173
        </Text>
        .
      </Text>
    </Alert>
  );
};
