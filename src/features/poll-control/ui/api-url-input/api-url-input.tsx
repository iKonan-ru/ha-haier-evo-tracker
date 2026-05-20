import { useState, type ChangeEvent, type FC } from 'react';
import { Button, Group, TextInput } from '@mantine/core';
import { useApplyHost } from '../../hooks';
import { useTrackerStore } from '../../store';

export const ApiUrlInput: FC = () => {
  const apiHost = useTrackerStore((store) => store.apiHost);
  const [localHost, setLocalHost] = useState(apiHost);
  const { isApplying, applyHost } = useApplyHost();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLocalHost(event.currentTarget.value);
  };

  return (
    <Group
      align="flex-end"
      gap="8"
      w={{ base: '100%', sm: 'auto' }}
    >
      <TextInput
        label="Хост Home Assistant"
        placeholder="http://homeassistant.local:8123"
        value={localHost}
        onChange={handleChange}
        autoComplete="url"
        name="ha-host"
        size="xs"
        style={{ flex: 1, minWidth: 120 }}
      />

      <Button
        size="xs"
        variant="default"
        loading={isApplying}
        disabled={!localHost.trim()}
        onClick={() => applyHost(localHost)}
      >
        Применить
      </Button>
    </Group>
  );
};
