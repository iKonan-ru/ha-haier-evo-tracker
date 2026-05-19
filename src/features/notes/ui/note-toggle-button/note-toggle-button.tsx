import { type FC } from 'react';
import { Button } from '@mantine/core';
import { useNotesStore } from '../../store';

interface INoteToggleButtonProps {
  codeKey: string;
}

export const NoteToggleButton: FC<INoteToggleButtonProps> = ({ codeKey }) => {
  const expandedNoteKey = useNotesStore((store) => store.expandedNoteKey);
  const setExpandedNoteKey = useNotesStore((store) => store.setExpandedNoteKey);

  const handleClick = (): void => {
    setExpandedNoteKey(expandedNoteKey === codeKey ? null : codeKey);
  };

  return (
    <Button
      variant="default"
      size="xs"
      onClick={handleClick}
    >
      Заметка
    </Button>
  );
};
