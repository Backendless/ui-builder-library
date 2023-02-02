import { useEffect, useRef, useState } from 'react';

import { Toolbar } from './toolbar';
import { useQuillLibrary } from './use-quill-library';

const { cn } = BackendlessUI.CSSUtils;

export default function RichEditor({ component, eventHandlers, elRef }) {
  const {
    display, classList, style, fixedToolbar, editorHeight, editorMinHeight, borderWidth, borderStyle, borderColor,
  } = component;
  const { onBlur, onFocus, onTextChange } = eventHandlers;

  const [toolbarVisibility, setToolbarVisibility] = useState(fixedToolbar);

  const quillRef = useRef(null);
  const toolbarRef = useRef(null);
  const editorRef = useQuillLibrary(quillRef, toolbarRef, component, onTextChange);

  useComponentActions(component, editorRef);

  const focus = () => {
    if (!fixedToolbar) {
      setToolbarVisibility(true);
    }

    onFocus();
  };

  const blur = () => {
    if (!fixedToolbar) {
      setToolbarVisibility(false);
    }

    onBlur();
  };

  const styles = {
    display    : display ? 'flex' : 'none',
    borderWidth: ensureMeasure(borderWidth),
    borderStyle,
    borderColor,
    ...style,
  };

  const editorStyles = {
    height   : ensureMeasure(editorHeight),
    minHeight: ensureMeasure(editorMinHeight),
  };

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-rich-editor', classList) } style={ styles }>
      <Toolbar component={ component } toolbarRef={ toolbarRef } toolbarVisibility={ toolbarVisibility }/>

      <div ref={ quillRef } id="editor" style={ editorStyles } onBlur={ blur } onFocus={ focus }/>
    </div>
  );
}

export function ensureMeasure(dimension) {
  return String(Number(dimension)) === dimension ? dimension + 'px' : dimension;
}

function useComponentActions(component, editorRef) {
  Object.assign(component, {
    getText     : (index, length) => editorRef.current.getText(index, length),
    setText     : text => editorRef.current.setText(text),
    getHTML     : () => editorRef.current.root.innerHTML,
    setHTML     : content => editorRef.current.root.innerHTML = content,
    getLength   : () => editorRef.current.getLength(),
    deleteText  : (index = 0, length) => editorRef.current.deleteText(index, length),
    format      : (property, value) => editorRef.current.format(property, value),
    blur        : () => editorRef.current.blur(),
    focus       : () => editorRef.current.focus(),
    setSelection: (index, length) => editorRef.current.setSelection(index, length),
    getSelection: () => editorRef.current.getSelection(),
  });
}
