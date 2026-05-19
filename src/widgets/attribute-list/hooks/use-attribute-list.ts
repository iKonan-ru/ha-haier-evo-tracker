import { useMemo } from 'react';
import { passesFilter, type IFilterState } from '@features/attribute-filters';
import { useTrackerStore } from '@features/poll-control';
import type { IAttribute } from '@entities/attribute';

interface IUseAttributeListResult {
  sortedAttrs: IAttribute[];
}

export const useAttributeList = (
  filters: IFilterState,
): IUseAttributeListResult => {
  const attributes = useTrackerStore((store) => store.attributes);
  const changedKeys = useTrackerStore((store) => store.changedKeys);
  const changedOrder = useTrackerStore((store) => store.changedOrder);

  const sortedAttrs = useMemo(() => {
    const filtersWithKeys: IFilterState = { ...filters, changedKeys };
    const filtered = attributes.filter((attr) =>
      passesFilter(attr, filtersWithKeys),
    );

    return filtered.sort((a, b) => {
      const aIdx = changedOrder.indexOf(a.codeKey);
      const bIdx = changedOrder.indexOf(b.codeKey);
      const aChanged = aIdx !== -1;
      const bChanged = bIdx !== -1;

      if (aChanged && bChanged) {
        return aIdx - bIdx;
      }

      if (aChanged) {
        return -1;
      }

      if (bChanged) {
        return 1;
      }

      return a.code - b.code;
    });
  }, [attributes, changedKeys, changedOrder, filters]);

  return { sortedAttrs };
};
