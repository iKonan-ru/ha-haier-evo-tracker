import { useState, type FC } from 'react';
import { SimpleGrid, Text } from '@mantine/core';
import { FilterToolbar, type IFilterState } from '@features/attribute-filters';
import { useTrackerStore } from '@features/poll-control';
import { useAttributeList } from '../hooks';
import { AttributeItem } from './attribute-item';

const INITIAL_FILTERS: IFilterState = {
  onlyChanged: false,
  searchCode: '',
  changedKeys: new Set(),
};

export const AttributeList: FC = () => {
  const [filters, setFilters] = useState<IFilterState>(INITIAL_FILTERS);
  const attributes = useTrackerStore((store) => store.attributes);
  const changedKeys = useTrackerStore((store) => store.changedKeys);
  const { sortedAttrs } = useAttributeList({ ...filters, changedKeys });

  if (attributes.length === 0) {
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
      {!sortedAttrs.length ? (
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
          {sortedAttrs.map((attr) => (
            <AttributeItem
              key={attr.codeKey}
              attr={attr}
              isChanged={changedKeys.has(attr.codeKey)}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
