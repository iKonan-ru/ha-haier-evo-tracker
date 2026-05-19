import type { IAttribute } from '../types';
import { UNKNOWN_ATTR_NAME } from './constants';

const NOT_FOUND = 'not found';

export const resolveListLabel = (attr: IAttribute): string | null => {
  const { current } = attr;

  if (current == null) {
    return null;
  }

  if (!attr.list?.length) {
    return null;
  }

  const item = attr.list.find((x) => String(x.value) === String(current));

  if (!item) {
    return null;
  }

  const label =
    item.description && item.description !== NOT_FOUND
      ? item.description
      : item.name;

  const isUsable = label && label !== UNKNOWN_ATTR_NAME && label !== NOT_FOUND;

  return isUsable ? label : String(item.value);
};
