import { useState, useEffect, useMemo, useCallback } from 'react';

import { AceEditor } from './lib/react-ace.umd';
import './lib/ace-builds.umd';

const { cn } = BackendlessUI.CSSUtils;

export default function AceEditorComponent({ component, elRef, eventHandlers }) {
  const {
    classList, display, style, readOnly, name, value, mode, theme,
    foldStyle, placeholder, width, height, fontSize, tabSize, printMarginColumn,
    printMarginVisibility, gutterVisibility, autocompletion, highlightActiveLine, showInvisibles
  } = component;
  const { onChange } = eventHandlers;

  const [editorValue, setEditorValue] = useState(value);

  component.getValue = () => editorValue;
  component.setValue = value => setEditorValue(value);

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const options = useMemo(() => ({
    printMarginColumn,
    showInvisibles,
    enableLiveAutocompletion: autocompletion,
    enableBasicAutocompletion: autocompletion,
    foldStyle,
  }), [printMarginColumn, showInvisibles, autocompletion, foldStyle]);

  const onChangeHandler = useCallback((value) => {
    setEditorValue(value);
    onChange({ value });
  }, []);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn("bl-customComponent-aceEditor", classList) } style={ style }>
      <AceEditor
        value={ editorValue }
        mode={ mode }
        theme={ theme }
        width={ width }
        height={ height }
        readOnly={ readOnly }
        placeholder={ placeholder }
        name={ name }
        fontSize={ fontSize }
        showGutter={ gutterVisibility }
        highlightActiveLine={ highlightActiveLine }
        tabSize={ tabSize }
        showPrintMargin={ printMarginVisibility }
        setOptions={ options }
        onChange={ onChangeHandler }
      />
    </div>
  );
}
