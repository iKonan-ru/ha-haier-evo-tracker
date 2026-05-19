import type { IAttribute } from '@entities/attribute';

export interface IFilterState {
  onlyChanged: boolean;
  searchCode: string;
  changedKeys: Set<string>;
}

export const passesFilter = (
  attr: IAttribute,
  filters: IFilterState,
): boolean => {
  const { onlyChanged, searchCode, changedKeys } = filters;

  if (onlyChanged && !changedKeys.has(attr.codeKey)) {
    return false;
  }

  const trimmedSearch = searchCode.trim();

  return (
    !trimmedSearch ||
    String(attr.code).includes(trimmedSearch) ||
    attr.codeKey.includes(trimmedSearch)
  );
};
