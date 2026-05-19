export interface IChangelogEntry {
  at: string;
  code: number;
  codeKey: string;
  name: string;
  oldVal: string | number | null;
  newVal: string | number | null;
  /** Читаемый лейбл нового значения */
  newLabel: string;
}
