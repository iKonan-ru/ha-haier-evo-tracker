import { notifications } from '@mantine/notifications';
import type { INotesData } from '@shared/lib/storage';
import { useNotesStore } from '../store';

interface IUseExportImportResult {
  handleExport: () => void;
  handleImport: (file: File) => void;
}

export const useExportImport = (): IUseExportImportResult => {
  const notesData = useNotesStore((store) => store.notesData);
  const mergeImport = useNotesStore((store) => store.mergeImport);

  const handleExport = (): void => {
    const blob = new Blob([JSON.stringify(notesData, null, 2)], {
      type: 'application/json',
    });
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = 'ha-haier-evo-notes.json';
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  };

  const handleImport = (file: File): void => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string) as INotesData;

        if (!Array.isArray(data.notes)) {
          throw new Error('Нет поля notes');
        }

        const { added } = mergeImport(data);
        notifications.show({
          message: `Импортировано заметок: ${added}`,
          color: 'green',
        });
      } catch (err) {
        notifications.show({
          message: `Импорт: ${err instanceof Error ? err.message : String(err)}`,
          color: 'red',
        });
      }
    };

    reader.readAsText(file);
  };

  return { handleExport, handleImport };
};
