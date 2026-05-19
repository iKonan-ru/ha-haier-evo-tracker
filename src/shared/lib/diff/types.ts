export type AttributeValue = string | number | null;

export interface IAttributeChange {
  codeKey: string;
  oldVal: AttributeValue;
  newVal: AttributeValue;
}

export interface IDiffResult {
  changedKeys: Set<string>;
  changes: IAttributeChange[];
  snapshot: Map<string, AttributeValue>;
}
