import { type ChangeEvent, type FC } from 'react';
import { Checkbox, Group, TextInput } from '@mantine/core';
import type { IFilterState } from '../../utils/passes-filter';

interface IFilterToolbarProps {
  filters: IFilterState;
  onFilterChange: (filters: IFilterState) => void;
}

export const FilterToolbar: FC<IFilterToolbarProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleOnlyChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    onFilterChange({ ...filters, onlyChanged: event.currentTarget.checked });
  };

  const handleSearchCode = (event: ChangeEvent<HTMLInputElement>): void => {
    onFilterChange({ ...filters, searchCode: event.currentTarget.value });
  };

  return (
    <Group
      gap="md"
      mb="sm"
    >
      <Checkbox
        label="Только изменённые"
        checked={filters.onlyChanged}
        onChange={handleOnlyChanged}
        size="xs"
      />
      <TextInput
        placeholder="Поиск code"
        value={filters.searchCode}
        onChange={handleSearchCode}
        size="xs"
        w={120}
      />
    </Group>
  );
};
