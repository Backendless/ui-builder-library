import { ensureMeasure } from './index';
import { Font, FontFamilyMap, Size } from './use-quill-library';

const { cn } = BackendlessUI.CSSUtils;

export function Toolbar({ component, toolbarRef, toolbarVisibility }) {
  const {
    toolbarPosition, borderWidth, borderColor, borderStyle, showTooltips, defaultFontFamily, defaultFontSize,
    linkInsertButton, imageInsertButton, videoInsertButton, fontStyleButtons, historyButtons, alignmentButtons,
    fontSelect, fontSizeSelect, textColorPicker, backgroundColorPicker, clearFormattingButton, textDirectionButton,
    listButtons, scriptButtons, textBlockButtons, headingButtons,
  } = component;

  const optionsVisibility = linkInsertButton || imageInsertButton || videoInsertButton || fontStyleButtons ||
    historyButtons || alignmentButtons || fontSelect || fontSizeSelect || textColorPicker || backgroundColorPicker ||
    clearFormattingButton || textDirectionButton || listButtons || scriptButtons || textBlockButtons || headingButtons;

  const styles = {
    display          : toolbarVisibility && optionsVisibility ? 'block' : 'none',
    borderBottomWidth: toolbarPosition === 'top' ? ensureMeasure(borderWidth) : '0',
    borderTopWidth   : toolbarPosition === 'bottom' ? ensureMeasure(borderWidth) : '0',
    order            : toolbarPosition === 'bottom' ? '2' : '0',
    borderColor,
    borderStyle,
  };

  return (
    <div
      ref={ toolbarRef }
      id="toolbar-container"
      className={ cn({ 'active-tooltips': showTooltips }) }
      style={ styles }>
      { fontStyleButtons && <InlineFormattingButtons/> }

      { historyButtons && (
        <span className="ql-formats">
          <Button className="ql-undo material-icons-round" label="undo"/>
          <Button className="ql-redo material-icons-round" label="redo"/>
        </span>
      ) }

      { fontSelect && <FontSelect defaultFontFamily={ defaultFontFamily }/> }
      { fontSizeSelect && <SizeSelect defaultFontSize={ defaultFontSize }/> }

      { (textColorPicker || backgroundColorPicker) && (
        <span className="ql-formats">
          { textColorPicker && (
            <select className="ql-color"></select>
          ) }
          { backgroundColorPicker && (
            <select className="ql-background"></select>
          ) }
        </span>
      ) }

      { alignmentButtons && <AlignButtons/> }
      <EmbedsButtons
        linkInsertButton={ linkInsertButton }
        imageInsertButton={ imageInsertButton }
        videoInsertButton={ videoInsertButton }
      />
      <AdditionalFormattingButtons component={ component }/>

      { (textDirectionButton || clearFormattingButton) && (
        <span className="ql-formats">
          { textDirectionButton && (
            <Button className="ql-direction" value="rtl"/>
          ) }
          { clearFormattingButton && (
            <Button className="ql-clean"/>
          ) }
        </span>
      ) }
    </div>
  );
}

const Button = React.memo(({ className, value, label }) => (
  <button type="button" className={ className } value={ value }>{ label }</button>
));

const InlineFormattingButtons = React.memo(() => (
  <span className="ql-formats">
    { inlineFormattingClasses.map((className, index) => (
      <Button className={ className } key={ index }/>
    )) }
  </span>
));

const FontSelect = React.memo(({ defaultFontFamily }) => (
  <span className="ql-formats">
    <select className="ql-font" defaultValue={ FontFamilyMap[defaultFontFamily] }>
      { Font.whitelist.map((font, index) => {
        const fontLabel = font.split(',')[0].trim().replace(/(^|\s)\S/g, letter => letter.toUpperCase());

        return (
          <option value={ font } key={ index }>{ fontLabel }</option>
        );
      }) }
    </select>
  </span>
));

const SizeSelect = React.memo(({ defaultFontSize }) => (
  <span className="ql-formats">
    <select className="ql-size" defaultValue={ defaultFontSize }>
      { Size.whitelist.map((size, index) => (
        <option value={ size } key={ index }>{ size }</option>
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

const AdditionalFormattingButtons = React.memo(({ component }) => {
  const { listButtons, scriptButtons, textBlockButtons, headingButtons } = component;

  const visibility = listButtons || scriptButtons || textBlockButtons || headingButtons;

  const buttonGroupsVisibility = {
    list     : listButtons,
    header   : headingButtons,
    textBlock: textBlockButtons,
    script   : scriptButtons,
  };

  if (!visibility) {
    return null;
  }

  return (
    <span>
      { additionalFormats.map((button, index) => {
        const visibility = buttonGroupsVisibility[button[0].group];

        if (!visibility) {
          return null;
        }

        return (
          <span className="ql-formats" key={ index }>
            <Button className={ button[0].className } value={ button[0].value }/>
            <Button className={ button[1].className } value={ button[1].value }/>
          </span>
        );
      }) }
    </span>
  );
});

const inlineFormattingClasses = ['ql-bold', 'ql-italic', 'ql-underline', 'ql-strike'];

const alignValues = ['', 'center', 'right', 'justify'];

const additionalFormats = [
  [
    { className: 'ql-list', value: 'ordered', group: 'list' },
    { className: 'ql-list', value: 'bullet', group: 'list' },
  ],
  [
    { className: 'ql-header', value: '1', group: 'header' },
    { className: 'ql-header', value: '2', group: 'header' },
  ],
  [
    { className: 'ql-blockquote', group: 'textBlock' },
    { className: 'ql-code', group: 'textBlock' },
  ],
  [
    { className: 'ql-script', value: 'sub', group: 'script' },
    { className: 'ql-script', value: 'super', group: 'script' },
  ],
];
