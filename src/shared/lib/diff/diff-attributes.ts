import type { AttributeValue, IDiffResult } from './types';

export const diffAttributes = (
  previousSnapshot: Map<string, AttributeValue> | null,
  attributes: { codeKey: string; current?: string | number | null }[],
): IDiffResult => {
  const snapshot = new Map<string, AttributeValue>();

  for (const attr of attributes) {
    snapshot.set(attr.codeKey, attr.current ?? null);
  }

  const changedKeys = new Set<string>();
  const changes: IDiffResult['changes'] = [];

  if (previousSnapshot !== null) {
    for (const [key, value] of snapshot) {
      const oldVal = previousSnapshot.get(key) ?? null;

      if (oldVal === value) {
        continue;
      }

      changedKeys.add(key);
      changes.push({ codeKey: key, oldVal, newVal: value });
    }
  }

  return { changedKeys, changes, snapshot };
};
