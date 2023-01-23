import { useState, useEffect, useRef, useCallback } from 'react';

import { AceEditor } from './lib/react-ace.umd';
import './lib/ace-builds.umd';

const { cn } = BackendlessUI.CSSUtils;

export default function AceEditorComponent({ component, eventHandlers }) {
  const {
    classList, display, style, disabled, name, value, mode, theme,
    foldStyle, placeholder, width, height, fontSize, tabSize, printMarginColumn,
    printMarginVisibility, gutterVisibility, autocompletion, highlightActiveLine, showInvisibles
  } = component;
  const { onChange } = eventHandlers;

  const rootRef = useRef();
  const [editorValue, setEditorValue] = useState('');

  component.getValue = () => editorValue;
  component.setValue = value => setEditorValue(value);

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  useEffect(() => {
    component.el = rootRef.current;
  }, [rootRef]);

  const handleValueChange = useCallback((newValue) => {
    setEditorValue(newValue);
    onChange({ value: newValue });
  }, []);

  if (!display) {
    return null;
  }

  return (
    <div ref={ rootRef } className={ cn("bl-customComponent-aceEditor", classList) } style={ style }>
      <AceEditor
        value={ editorValue }
        mode={ mode }
        theme={ theme }
        width={ width }
        height={ height }
        readOnly={ disabled }
        placeholder={ placeholder }
        name={ name }
        fontSize={ fontSize }
        showGutter={ gutterVisibility }
        highlightActiveLine={ highlightActiveLine }
        tabSize={ tabSize }
        showPrintMargin={ printMarginVisibility }
        setOptions={ {
          printMarginColumn,
          showInvisibles,
          enableLiveAutocompletion: autocompletion,
          enableBasicAutocompletion: autocompletion,
          foldStyle,
        } }
        onChange={ handleValueChange }
      />
    </div>
  );
}
