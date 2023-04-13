import { useEffect, useRef } from 'react';

import Quill from './lib/quil.min';

const FontSize = [
  '8px', '9px', '10px', '11px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '36px', '48px',
];

const FontFamily = [
  'arial, helvetica, sans-serif', 'Comic Sans MS, cursive, sans-serif', 'courier new, courier, monospace',
  'georgia, palatino, serif', 'helvetica, arial, sans-serif', 'Lucida Sans Unicode, Lucida Grande, sans-serif',
  'andale mono, monospace', 'book antiqua, palatino, serif', 'impact, sans-serif',
  'tahoma, arial, helvetica, sans-serif', 'terminal, monaco, monospace', 'times new roman, times, serif',
  'trebuchet ms, geneva, sans-serif', 'verdana, geneva, sans-serif',
];

export const DefaultStyles = {
  fontSize  : '14px',
  fontFamily: 'arial, helvetica, sans-serif',
};

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

export const Size = Quill.import('formats/size');
export const Font = Quill.import('formats/font');
const AlignStyle = Quill.import('attributors/style/align');
const DirectionStyle = Quill.import('attributors/style/direction');
const FontStyle = Quill.import('attributors/style/font');
const SizeStyle = Quill.import('attributors/style/size');
const Blockquote = Quill.import('formats/blockquote');
const CodeBlock = Quill.import('formats/code');
const BlockPrototype = Quill.import('blots/block');

Size.whitelist = FontSize;
Font.whitelist = FontFamily;
SizeStyle.whitelist = FontSize;
FontStyle.whitelist = FontFamily;

addInlineStyles(Blockquote, BlockquoteStyles);
addInlineStyles(CodeBlock, CodeStyles);

class Block extends BlockPrototype {
  constructor(domNode, value) {
    super(domNode, value);

    this.format('fontSize', DefaultStyles.fontSize);
    this.format('fontFamily', DefaultStyles.fontFamily);
  }

  format(name, value) {
    if (DefaultStyles[name]) {
      this.domNode.style[name] = value;
    } else {
      super.format(name, value);
    }
  }
}

Quill.register(Size, true);
Quill.register(Font, true);
Quill.register(AlignStyle, true);
Quill.register(DirectionStyle, true);
Quill.register(FontStyle, true);
Quill.register(SizeStyle, true);
Quill.register(Blockquote, true);
Quill.register(CodeBlock, true);
Quill.register(Block, true);

export function useQuillLibrary(quillRef, toolbarRef, component, onTextChange) {
  const { placeholder, readOnly, content, scrollingContainer } = component;

  const editorRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    editorRef.current = new Quill(quillRef.current, {
      bounds : quillRef.current,
      modules: {
        toolbar  : {
          container: toolbarRef.current,
          handlers : { undo, redo },
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
  }, [scrollingContainer]);

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
