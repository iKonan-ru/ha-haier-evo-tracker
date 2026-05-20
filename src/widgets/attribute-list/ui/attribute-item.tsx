import { type FC } from 'react';
import {
  NoteForm,
  NotesList,
  NoteToggleButton,
  useNotesStore,
} from '@features/notes';
import { AttributeRow, type IAttribute } from '@entities/attribute';

interface IAttributeItemProps {
  attr: IAttribute;
  isChanged: boolean;
}

export const AttributeItem: FC<IAttributeItemProps> = ({ attr, isChanged }) => {
  const notes = useNotesStore((store) =>
    store.notesData.notes.filter((note) => note.codeKey === attr.codeKey),
  );

  return (
    <AttributeRow
      attr={attr}
      isChanged={isChanged}
      actions={<NoteToggleButton codeKey={attr.codeKey} />}
      noteContent={
        <>
          <NotesList notes={notes} />
          <NoteForm attr={attr} />
        </>
      }
    />
  );
};
