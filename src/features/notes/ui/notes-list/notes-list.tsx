import { type FC } from 'react';
import { CloseButton, Group, Stack, Text } from '@mantine/core';
import type { INote } from '@shared/lib/storage';
import { useNotesStore } from '../../store';

interface INotesListProps {
  notes: INote[];
}

export const NotesList: FC<INotesListProps> = ({ notes }) => {
  const deleteNote = useNotesStore((store) => store.deleteNote);

  if (!notes.length) {
    return null;
  }

  return (
    <Stack
      gap={4}
      mt="xs"
    >
      {notes.map((note) => (
        <Group
          key={note.id}
          gap="xs"
          align="flex-start"
          style={{
            borderTop: '1px solid var(--mantine-color-gray-2)',
            paddingTop: 4,
          }}
        >
          <Stack
            gap={2}
            style={{ flex: 1 }}
          >
            <Text
              size="xs"
              c="dimmed"
            >
              <Text
                component="time"
                size="xs"
                c="gray.5"
              >
                {new Date(note.createdAt).toLocaleString('ru-RU')}
              </Text>

              {': '}
              {note.text}

              {note.valueAtSave != null && (
                <Text
                  component="span"
                  size="xs"
                  c="gray.5"
                >
                  {' '}
                  ({note.valueAtSave}
                  {note.valueLabel ? ` → ${note.valueLabel}` : ''})
                </Text>
              )}
            </Text>
          </Stack>

          <CloseButton
            size="xs"
            onClick={() => deleteNote(note.id)}
            aria-label="Удалить заметку"
          />
        </Group>
      ))}
    </Stack>
  );
};
