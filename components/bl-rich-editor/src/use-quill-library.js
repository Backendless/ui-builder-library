import { useCallback, useEffect, useRef } from 'react';

import Quill from './lib/quil.min';

const TOOLTIP_INPUT_PLACEHOLDER = 'Embed URL';
export const APP_FONT_SIZE = 'inherit';
export const FontSize = [
  '8px', '9px', '10px', '11px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '36px', '48px',
];

export const FontFamilyMap = {
  ARIAL              : 'arial, helvetica, sans-serif',
  COMIC_SANS_MS      : 'Comic Sans MS, cursive, sans-serif',
  COURIER_NEW        : 'courier new, courier, monospace',
  GEORGIA            : 'georgia, palatino, serif',
  HELVETICA          : 'helvetica, arial, sans-serif',
  LUCIDA_SANS_UNICODE: 'Lucida Sans Unicode, Lucida Grande, sans-serif',
  ANDALE_MONO        : 'andale mono, monospace',
  BOOK_ANTIQUA       : 'book antiqua, palatino, serif',
  IMPACT             : 'impact, sans-serif',
  TAHOMA             : 'tahoma, arial, helvetica, sans-serif',
  TERMINAL           : 'terminal, monaco, monospace',
  TIMES_NEW_ROMAN    : 'times new roman, times, serif',
  TREBUCHET_MS       : 'trebuchet ms, geneva, sans-serif',
  VERDANA            : 'verdana, geneva, sans-serif',
};

export const FontFamilyLabels = {
  [FontFamilyMap.ARIAL]              : 'Arial',
  [FontFamilyMap.COMIC_SANS_MS]      : 'Comic Sans MS',
  [FontFamilyMap.COURIER_NEW]        : 'Courier New',
  [FontFamilyMap.GEORGIA]            : 'Georgia',
  [FontFamilyMap.HELVETICA]          : 'Helvetica',
  [FontFamilyMap.LUCIDA_SANS_UNICODE]: 'Lucida Sans Unicode',
  [FontFamilyMap.ANDALE_MONO]        : 'Andale Mono',
  [FontFamilyMap.BOOK_ANTIQUA]       : 'Book Antiqua',
  [FontFamilyMap.IMPACT]             : 'Impact',
  [FontFamilyMap.TAHOMA]             : 'Tahoma',
  [FontFamilyMap.TERMINAL]           : 'Terminal',
  [FontFamilyMap.TIMES_NEW_ROMAN]    : 'Times New Roman',
  [FontFamilyMap.TREBUCHET_MS]       : 'Trebuchet MS',
  [FontFamilyMap.VERDANA]            : 'Verdana',
};

export const FontFamily = Object.values(FontFamilyMap);

const BlockquoteStyles = {
  borderLeft  : '4px solid #ccc',
  marginBottom: '5px',
  marginTop   : '5px',
  paddingLeft : '16px',
};

const CodeStyles = {
  padding        : '3px 5px',
  margin         : '2px 4px',
  borderRadius   : '3px',
  letterSpacing  : '1px',
  backgroundImage: 'linear-gradient(rgba(209, 209, 209, 0.5), rgba(209, 209, 209, 0.5))',
};

const Size = Quill.import('formats/size');
const Font = Quill.import('formats/font');
const AlignStyle = Quill.import('attributors/style/align');
const DirectionStyle = Quill.import('attributors/style/direction');
const FontStyle = Quill.import('attributors/style/font');
const SizeStyle = Quill.import('attributors/style/size');
const Blockquote = Quill.import('formats/blockquote');
const CodeBlock = Quill.import('formats/code');
const BlockPrototype = Quill.import('blots/block');
const Delta = Quill.import('delta');

Size.whitelist = FontSize;
Font.whitelist = FontFamily;
SizeStyle.whitelist = FontSize;
FontStyle.whitelist = FontFamily;

addInlineStyles(Blockquote, BlockquoteStyles);
addInlineStyles(CodeBlock, CodeStyles);

function registerBlockFormat(defaultFontFamily, defaultFontSize, quillRef) {
  const computedStyle = getComputedStyle(quillRef.current);
  const defaultFont = FontFamilyMap[defaultFontFamily] || defaultFontFamily;
  const font = FontFamilyMap[defaultFontFamily] ? defaultFont : computedStyle.fontFamily;
  const fontSize = defaultFontSize === APP_FONT_SIZE ? computedStyle.fontSize : defaultFontSize;

  class Block extends BlockPrototype {
    constructor(domNode, value) {
      super(domNode, value);

      this.format('fontSize', fontSize);
      this.format('fontFamily', font);
    }

    format(name, value) {
      if (name === 'fontSize' || name === 'fontFamily') {
        this.domNode.style[name] = value;
      } else {
        super.format(name, value);
      }
    }
  }

  Quill.register(Block, true);
}

Quill.register(Size, true);
Quill.register(Font, true);
Quill.register(AlignStyle, true);
Quill.register(DirectionStyle, true);
Quill.register(FontStyle, true);
Quill.register(SizeStyle, true);
Quill.register(Blockquote, true);
Quill.register(CodeBlock, true);

export function useQuillLibrary(quillRef, toolbarRef, component, onTextChange) {
  const {
    placeholder, readOnly, content, scrollingContainer, defaultFontFamily, defaultFontSize, insertImageAsURL,
  } = component;

  const editorRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    registerBlockFormat(defaultFontFamily, defaultFontSize, quillRef);

    editorRef.current = new Quill(quillRef.current, {
      bounds : quillRef.current,
      modules: {
        toolbar  : {
          container: toolbarRef.current,
          handlers : {
            undo,
            redo,
            image: insertImageAsURL ? insertImageURL : undefined,
          },
        },
        clipboard: { matchVisual: false },
      },
      theme  : 'snow',
      scrollingContainer,
      placeholder,
      readOnly,
    });

    editorRef.current.on('text-change', () => {
      const innerHtml = editorRef.current.root.innerHTML;

      if (innerHtml === contentRef.current) {
        return;
      }

      setTimeout(() => {
        contentRef.current = editorRef.current.root.innerHTML;
        component.content = contentRef.current;
      });

      onTextChange();
    });

    if (insertImageAsURL) {
      editorRef.current.clipboard.addMatcher('IMG', () => new Delta().insert(''));
      editorRef.current.clipboard.addMatcher('PICTURE', () => new Delta().insert(''));
    }
  }, [scrollingContainer, placeholder]);

  useEffect(() => {
    if (content === undefined || content === contentRef.current) {
      return;
    }

    insertHTML(editorRef.current, content);
  }, [content]);

  useEffect(() => {
    editorRef.current.enable(!readOnly);
  }, [readOnly]);

  const undo = () => editorRef.current.history.undo();
  const redo = () => editorRef.current.history.redo();

  const insertImageURL = useCallback(() => {
    const tooltip = editorRef.current.theme.tooltip;
    const originalSave = tooltip.save;
    const originalHide = tooltip.hide;

    tooltip.save = () => {
      const range = editorRef.current.getSelection(true);
      const value = tooltip.textbox.value;

      if (value) {
        editorRef.current.insertEmbed(range.index, 'image', value, 'user');
        tooltip.textbox.value = '';
      }
    };

    tooltip.hide = () => {
      tooltip.save = originalSave;
      tooltip.hide = originalHide;
      tooltip.hide();
    };

    tooltip.edit('image');
    tooltip.textbox.placeholder = TOOLTIP_INPUT_PLACEHOLDER;
  }, []);

  return editorRef;
}

export function insertHTML(editor, content) {
  const range = editor.getSelection();
  const delta = editor.clipboard.convert(content);

  editor.setContents(delta);

  if (range) {
    editor.setSelection(range.index);
  }
}

function addInlineStyles(block, styles) {
  const createBlock = block.create;

  block.create = function() {
    const node = createBlock.call(this);

    Object.keys(styles).forEach(key => node.style[key] = styles[key]);

    return node;
  };
}
