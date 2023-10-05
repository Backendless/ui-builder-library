import { useState, useEffect, useMemo, useCallback } from 'react';

import { AceEditor } from './lib/react-ace.umd';
import './lib/ace-builds.umd';

const { normalizeDimensionValue, cn } = BackendlessUI.CSSUtils;

export default function AceCodeEditorComponent({ component, elRef, eventHandlers }) {
  const {
    classList, display, style, readOnly, value, mode, theme,
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

  const styles = useMemo(() => ({
    ...style,
    width: normalizeDimensionValue(width),
    height: normalizeDimensionValue(height)
  }), [style, width, height]);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn("bl-customComponent-aceCodeEditor", classList) } style={ styles }>
      <AceEditor
        value={ editorValue }
        mode={ mode }
        theme={ theme }
        width="100%"
        height="100%"
        readOnly={ readOnly }
        placeholder={ placeholder }
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
