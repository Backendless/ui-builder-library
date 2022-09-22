import { validate } from './index';
import { Font, Size } from './use-quill-library';

export function Toolbar({ component, toolbarRef, toolbarVisibility }) {
  const {
    linkInsertButton,
    imageInsertButton,
    videoInsertButton,
    toolbarPosition,
    borderWidth,
    borderColor,
    borderStyle,
  } = component;

  const styles = {
    display          : toolbarVisibility ? 'block' : 'none',
    borderBottomWidth: toolbarPosition === 'top' ? validate(borderWidth) : '0',
    borderTopWidth   : toolbarPosition === 'bottom' ? validate(borderWidth) : '0',
    order            : toolbarPosition === 'bottom' ? '2' : '0',
    borderColor,
    borderStyle,
  };

  return (
    <div ref={ toolbarRef } id="toolbar-container" style={ styles }>
      <InlineFormattingButtons/>
      <span className="ql-formats">
        <Button className="ql-undo material-icons-round" label="undo"/>
        <Button className="ql-redo material-icons-round" label="redo"/>
      </span>
      <FontSelect/>
      <SizeSelect/>
      <span className="ql-formats">
        <select className="ql-color"></select>
        <select className="ql-background"></select>
      </span>
      <AlignButtons/>
      <EmbedsButtons
        linkInsertButton={ linkInsertButton }
        imageInsertButton={ imageInsertButton }
        videoInsertButton={ videoInsertButton }
      />
      <AdditionalFormattingButtons/>
    </div>
  );
}

function Button({ className, value, label }) {
  return (
    <button type="button" className={ className } value={ value }>{ label }</button>
  );
}

function InlineFormattingButtons() {
  const inlineFormattingClasses = ['ql-bold', 'ql-italic', 'ql-underline', 'ql-strike'];

  return (
    <span className="ql-formats">
      { inlineFormattingClasses.map((className, index) => (
        <Button className={ className } key={ index }/>
      )) }
    </span>
  );
}

function FontSelect() {
  return (
    <span className="ql-formats">
      <select className="ql-font" defaultValue="arial">
        { Font.whitelist.map((font, index) => {
          const fontLabel = font.replace(/-/g, ' ').replace(/(^|\s)\S/g, letter => letter.toUpperCase());

          return (
            <option value={ font } key={ index }>{ fontLabel }</option>
          );
        }) }
      </select>
    </span>
  );
}

function SizeSelect() {
  return (
    <span className="ql-formats">
      <select className="ql-size" defaultValue="14">
        { Size.whitelist.map((size, index) => (
          <option value={ size } key={ index }>{ size }px</option>
        )) }
      </select>
    </span>
  );
}

function AlignButtons() {
  const alignValues = ['', 'center', 'right', 'justify'];

  return (
    <span className="ql-formats">
      { alignValues.map((value, index) => {
        const className = !value ? 'ql-align ql-active' : 'ql-align';

        return (
          <Button className={ className } value={ value } key={ index }/>
        );
      }) }
    </span>
  );
}

function EmbedsButtons({ linkInsertButton, imageInsertButton, videoInsertButton }) {
  const visibility = linkInsertButton || imageInsertButton || videoInsertButton;
  
  if (!visibility) {
    return null;
  }
  
  return (
    <span className="ql-formats">
      { linkInsertButton && <Button className="ql-link"/> }
      { imageInsertButton && <Button className="ql-image"/> }
      { videoInsertButton && <Button className="ql-video"/> }
    </span>
  );
}

function AdditionalFormattingButtons() {
  return (
    <span>
      { additionalFormats.map((button, index) => (
        <span className="ql-formats" key={ index }>
          <Button className={ button[0].className } value={ button[0].value }/>
          <Button className={ button[1].className } value={ button[1].value }/>
        </span>
      )) }
    </span>
  );
}

const additionalFormats = [
  [
    { className: 'ql-list', value: 'ordered' },
    { className: 'ql-list', value: 'bullet' },
  ],
  [
    { className: 'ql-header', value: '1' },
    { className: 'ql-header', value: '2' },
  ],
  [
    { className: 'ql-blockquote' },
    { className: 'ql-code-block' },
  ],
  [
    { className: 'ql-script', value: 'sub' },
    { className: 'ql-script', value: 'super' },
  ],
  [
    { className: 'ql-direction', value: 'rtl' },
    { className: 'ql-clean' },
  ],
];
