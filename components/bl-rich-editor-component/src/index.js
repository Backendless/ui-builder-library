import { useRef, useState } from 'react';

import { Toolbar } from './toolbar';
import { useQuillLibrary } from './use-quill-library';

const { cn } = BackendlessUI.CSSUtils;

export default function RichEditor({ component, eventHandlers }) {
  const {
    display,
    classList,
    style,
    fixedToolbar,
    editorHeight,
    editorMinHeight,
    borderWidth,
    borderStyle,
    borderColor,
  } = component;
  const { onBlur, onFocus, onTextChange } = eventHandlers;

  const [toolbarVisibility, setToolbarVisibility] = useState(fixedToolbar);
  const quillRef = useRef(null);
  const toolbarRef = useRef(null);
  const editorRef = useQuillLibrary(quillRef, toolbarRef, component, onTextChange);

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

  component.getText = (index, length) => editorRef.current.getText(index, length);
  component.setText = data => editorRef.current.setText(data);
  component.getHTML = () => editorRef.current.root.innerHTML;
  component.setHTML = data => editorRef.current.root.innerHTML = data;
  component.getLength = () => editorRef.current.getLength();
  component.deleteText = (index, length) => editorRef.current.deleteText(index, length);
  component.format = (property, value) => editorRef.current.format(property, value);
  component.blur = () => editorRef.current.blur();
  component.focus = () => editorRef.current.focus();
  component.setSelection = (index, length) => editorRef.current.setSelection(index, length);
  component.getSelection = () => editorRef.current.getSelection();

  const styles = {
    display: display ? 'flex' : 'none',
    borderWidth: validate(borderWidth),
    borderStyle,
    borderColor,
    ...style,
  };

  const editorHeightStyles = {
    height   : validate(editorHeight),
    minHeight: validate(editorMinHeight),
  };

  return (
    <div className={ cn('bl-customComponent-rich-editor', classList) } style={ styles }>
      <Toolbar component={ component } toolbarRef={ toolbarRef } toolbarVisibility={ toolbarVisibility }/>
      <div ref={ quillRef } id="editor" style={ editorHeightStyles } onBlur={ blur } onFocus={ focus }></div>
    </div>
  );
}

export function validate(dimension) {
  return String(Number(dimension)) === dimension ? dimension + 'px' : dimension;
}
