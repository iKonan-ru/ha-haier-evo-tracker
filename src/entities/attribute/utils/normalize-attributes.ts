import type { IDevice } from '@shared/api';
import type { IAttribute } from '../types';
import { getCodeKey } from './get-code-key';

export const normalizeAttributes = (device: IDevice): IAttribute[] => {
  const rawAttrs = device.config.attributes;
  const seen = new Set<string>();

  return rawAttrs.reduce<IAttribute[]>((acc, attr, index) => {
    const codeKey = getCodeKey(attr.code, attr.list);

    if (seen.has(codeKey)) {
      return acc;
    }

    seen.add(codeKey);
    acc.push({
      code: attr.code,
      codeKey,
      name: attr.name,
      current: attr.current,
      list: attr.list,
      range: attr.range,
      index,
    });

    return acc;
  }, []);
};
