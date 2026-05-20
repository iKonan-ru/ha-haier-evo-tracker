import { type FC } from 'react';
import { Select } from '@mantine/core';
import { useTrackerStore } from '../../store';

export const DeviceSelect: FC = () => {
  const availableDevices = useTrackerStore((store) => store.availableDevices);
  const selectedDeviceName = useTrackerStore(
    (store) => store.selectedDeviceName,
  );
  const setSelectedDeviceName = useTrackerStore(
    (store) => store.setSelectedDeviceName,
  );

  const handleChange = (value: string | null): void => {
    setSelectedDeviceName(value);
  };

  if (!availableDevices.length) {
    return null;
  }

  const data = availableDevices.map((name) => ({ value: name, label: name }));

  return (
    <Select
      label="Устройство"
      placeholder="Выберите устройство"
      data={data}
      value={selectedDeviceName}
      onChange={handleChange}
      clearable
      size="xs"
      w={{ base: '100%', sm: 220 }}
    />
  );
};
