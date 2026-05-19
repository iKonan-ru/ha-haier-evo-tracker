import { useState, type FC } from 'react';
import { SimpleGrid, Text } from '@mantine/core';
import { FilterToolbar, type IFilterState } from '@features/attribute-filters';
import {
  NoteForm,
  NotesList,
  NoteToggleButton,
  useNotesStore,
} from '@features/notes';
import { useTrackerStore } from '@features/poll-control';
import { AttributeRow } from '@entities/attribute';
import { useAttributeList } from '../hooks';

const INITIAL_FILTERS: IFilterState = {
  onlyChanged: false,
  searchCode: '',
  changedKeys: new Set(),
};

export const AttributeList: FC = () => {
  const [filters, setFilters] = useState<IFilterState>(INITIAL_FILTERS);
  const changedKeys = useTrackerStore((store) => store.changedKeys);
  const attributes = useTrackerStore((store) => store.attributes);
  const notesData = useNotesStore((store) => store.notesData);
  const { sortedAttrs } = useAttributeList({ ...filters, changedKeys });

  if (!attributes.length) {
    return (
      <Text
        c="dimmed"
        fs="italic"
        size="sm"
        p="md"
      >
        Выберите устройство и нажмите Старт для начала опроса
      </Text>
    );
  }

  return (
    <>
      <FilterToolbar
        filters={filters}
        onFilterChange={setFilters}
      />
      {sortedAttrs.length === 0 ? (
        <Text
          c="dimmed"
          fs="italic"
          size="sm"
          p="md"
        >
          Нет атрибутов по фильтру
        </Text>
      ) : (
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing="xs"
        >
          {sortedAttrs.map((attr) => {
            const isChanged = changedKeys.has(attr.codeKey);
            const notes = notesData.notes.filter(
              (note) => note.codeKey === attr.codeKey,
            );

            return (
              <AttributeRow
                key={attr.codeKey}
                attr={attr}
                isChanged={isChanged}
                actions={<NoteToggleButton codeKey={attr.codeKey} />}
                noteContent={
                  <>
                    <NotesList notes={notes} />
                    <NoteForm attr={attr} />
                  </>
                }
              />
            );
          })}
        </SimpleGrid>
      )}
    </>
  );
};
