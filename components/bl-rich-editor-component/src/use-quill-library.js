import { useEffect, useRef } from 'react';

import Quill from './lib/quil.min';

export const Font = Quill.import('formats/font');
Font.whitelist = [
  'arial',
  'comic-sans',
  'courier-new',
  'georgia',
  'helvetica',
  'lucida',
  'andale-mono',
  'book-antiqua',
  'impact',
  'tahoma',
  'terminal',
  'times-new-roman',
  'trebuchet-ms',
  'verdana',
];
Quill.register(Font, true);

export const Size = Quill.import('formats/size');
Size.whitelist = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48'];
Quill.register(Size, true);

export function useQuillLibrary(quillRef, toolbarRef, component, onTextChange) {
  const { placeholder, readOnly, content } = component;

  const editorRef = useRef(null);

  useEffect(() => {
    editorRef.current = new Quill(quillRef.current, {
      bounds     : quillRef.current,
      modules    : {
        toolbar: {
          container: toolbarRef.current,
          handlers : { undo, redo },
        },
      },
      placeholder: placeholder,
      readOnly   : readOnly,
      theme      : 'snow',
    });

    editorRef.current.on('text-change', function() {
      setTimeout(() => component.content = editorRef.current.root.innerHTML);
      onTextChange();
    });
  }, []);

  useEffect(() => {
    const innerHTML = editorRef.current.root.innerHTML;

    if (content === undefined || content === innerHTML) {
      return;
    }
    
    editorRef.current.root.innerHTML = content;
  }, [content]);

  const undo = () => editorRef.current.history.undo();
  const redo = () => editorRef.current.history.redo();

  return editorRef;
}
