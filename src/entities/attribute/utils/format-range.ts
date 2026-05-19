import type { IAttributeRange } from '../types';

export const formatRange = (range: IAttributeRange | undefined): string => {
  if (!range) {
    return '';
  }

  return `range: ${range.min}…${range.max}, step ${range.step}`;
};
