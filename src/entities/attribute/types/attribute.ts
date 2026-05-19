export interface IAttributeListItem {
  value: string | number;
  name: string;
  description?: string;
}

export interface IAttributeRange {
  min: number;
  max: number;
  step: number;
}

export interface IAttribute {
  code: number;
  /** Составной ключ: строка(code) или '-1:<list[0].value>' для виртуальных */
  codeKey: string;
  name: string;
  current?: string | number | null;
  list?: IAttributeListItem[];
  range?: IAttributeRange;
  /** Исходный индекс в массиве */
  index: number;
}
