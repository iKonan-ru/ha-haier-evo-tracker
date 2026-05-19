export interface INote {
  /** Уникальный идентификатор заметки */
  id: string;
  /** Числовой код атрибута */
  code: number;
  /** Составной ключ атрибута */
  codeKey: string;
  /** Текст заметки */
  text: string;
  /** ISO-строка даты создания */
  createdAt: string;
  /** Значение атрибута в момент сохранения */
  valueAtSave: string | number | null;
  /** Читаемый лейбл значения из списка (если есть) */
  valueLabel: string | null;
}

export interface INotesData {
  /** ID устройства, к которому привязаны заметки */
  deviceId: string | null;
  /** Массив заметок */
  notes: INote[];
}
