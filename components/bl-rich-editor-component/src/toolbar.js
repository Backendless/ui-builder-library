import { validate } from './index';
import { Font, Size } from './use-quill-library';

const { cn } = BackendlessUI.CSSUtils;

export function Toolbar({ component, toolbarRef, toolbarVisibility }) {
  const {
    linkInsertButton, imageInsertButton, videoInsertButton, toolbarPosition, borderWidth, borderColor, borderStyle,
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

const Button = React.memo(({ className, value, label }) => (
  <button type="button" className={ className } value={ value }>{ label }</button>
))

const InlineFormattingButtons = React.memo(() => (
  <span className="ql-formats">
    { inlineFormattingClasses.map((className, index) => (
      <Button className={ className } key={ index }/>
    )) }
  </span>
));

const FontSelect = React.memo(() => (
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
));

const SizeSelect = React.memo(() => (
  <span className="ql-formats">
    <select className="ql-size" defaultValue="14">
      { Size.whitelist.map((size, index) => (
        <option value={ size } key={ index }>{ size }px</option>
      )) }
    </select>
  </span>
));

const AlignButtons = React.memo(() => (
  <span className="ql-formats">
    { alignValues.map((value, index) => (
        <Button className={ cn('ql-align', { 'ql-active': !value }) } value={ value } key={ index }/>
    )) }
  </span>
));

const EmbedsButtons = React.memo(({ linkInsertButton, imageInsertButton, videoInsertButton }) => {
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
});

const AdditionalFormattingButtons = React.memo(() => (
  <span>
    { additionalFormats.map((button, index) => (
      <span className="ql-formats" key={ index }>
        <Button className={ button[0].className } value={ button[0].value }/>
        <Button className={ button[1].className } value={ button[1].value }/>
      </span>
    )) }
  </span>
));

const inlineFormattingClasses = ['ql-bold', 'ql-italic', 'ql-underline', 'ql-strike'];

const alignValues = ['', 'center', 'right', 'justify'];

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
