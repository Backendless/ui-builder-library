import { download } from './file';

export function makeSaveButton(options) {
  return function() {
    const {
      signaturePadRef,
      visibility,
      saveCallback,
      type,
      extension,
      onSaveClick,
      className,
      label,
    } = options;

    if (!visibility) {
      return null;
    }

    const save = () => {
      if (signaturePadRef.current.isEmpty()) {
        alert('Please provide a signature first.');

        return;
      }

      if (saveCallback) {
        saveCallback();
      } else {
        const dataURL = signaturePadRef.current.toDataURL('image/' + type);
        
        download(dataURL, 'signature.' + extension);
      }

      if (onSaveClick) {
        onSaveClick();
      }
    };

    return (
      <button className={ className } onClick={ save }>
        { label }
      </button>
    );
  };
}
