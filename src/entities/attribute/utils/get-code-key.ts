import type { IAttributeListItem } from '../types';

export const getCodeKey = (
  code: number,
  list?: IAttributeListItem[],
): string => {
  if (code === -1 && list?.[0]?.value !== undefined) {
    return `-1:${list[0].value}`;
  }

  return String(code);
};
