import type { IAttribute } from '../types';
import { resolveListLabel } from './resolve-list-label';

const EMPTY = '—';

export const formatValue = (attr: IAttribute): string => {
  if (attr.current == null) {
    return EMPTY;
  }

  const label = resolveListLabel(attr);

  if (label) {
    return `${attr.current} → ${label}`;
  }

  return String(attr.current);
};
