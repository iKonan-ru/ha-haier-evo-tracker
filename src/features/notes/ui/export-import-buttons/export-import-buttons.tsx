import { useRef, type ChangeEvent, type FC } from 'react';
import { Button, Group } from '@mantine/core';
import { useExportImport } from '../../hooks';

export const ExportImportButtons: FC = () => {
  const { handleExport, handleImport } = useExportImport();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    if (file) {
      handleImport(file);
    }

    event.target.value = '';
  };

  return (
    <Group
      gap="xs"
      mt={18}
    >
      <Button
        variant="default"
        size="xs"
        onClick={handleExport}
      >
        Экспорт JSON
      </Button>
      <Button
        variant="default"
        size="xs"
        onClick={handleImportClick}
      >
        Импорт JSON
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Group>
  );
};
