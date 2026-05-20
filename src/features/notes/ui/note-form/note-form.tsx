import { useRef, type FC } from 'react';
import { Button, Collapse, Group, Textarea } from '@mantine/core';
import { resolveListLabel, type IAttribute } from '@entities/attribute';
import { useNotesStore } from '../../store';

interface INoteFormProps {
  attr: IAttribute;
}

export const NoteForm: FC<INoteFormProps> = ({ attr }) => {
  const expandedNoteKey = useNotesStore((store) => store.expandedNoteKey);
  const setExpandedNoteKey = useNotesStore((store) => store.setExpandedNoteKey);
  const addNote = useNotesStore((store) => store.addNote);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isOpen = expandedNoteKey === attr.codeKey;

  const handleSave = (): void => {
    const text = textareaRef.current?.value?.trim();

    if (!text) {
      return;
    }

    const valueLabel = resolveListLabel(attr);

    addNote({
      codeKey: attr.codeKey,
      code: attr.code,
      text,
      valueAtSave: attr.current ?? null,
      valueLabel,
    });
    setExpandedNoteKey(null);
  };

  const handleCancel = (): void => {
    setExpandedNoteKey(null);
  };

  return (
    <Collapse in={isOpen}>
      <Textarea
        ref={textareaRef}
        placeholder="Опишите действие, которое привело к изменению значения"
        minRows={2}
        mt="xs"
      />
      <Group
        mt="xs"
        gap="xs"
      >
        <Button
          size="xs"
          onClick={handleSave}
        >
          Сохранить
        </Button>

        <Button
          variant="default"
          size="xs"
          onClick={handleCancel}
        >
          Отмена
        </Button>
      </Group>
    </Collapse>
  );
};
