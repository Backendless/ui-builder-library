import { useMemo } from 'react';

import { download, getImageBlob, upload } from './helpers';

export function DropImageArea({ image, setImage, initialLabel, uploadInputId }) {
  const uploadImage = e => upload(e, setImage);

  const onDragOver = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDragEnter = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  if (image) {
    return null;
  }

  return (
    <div className="drop-image-area" onDragEnter={ onDragEnter } onDragOver={ onDragOver } onDrop={ uploadImage }>
      <label htmlFor={ uploadInputId }>{ initialLabel }</label>
    </div>
  );
}

export function HeaderToolbar({ component, cropperRef, onSave, image, setImage, uploadInputId }) {
  const {
    addImageButtonVisibility, cleanButtonVisibility, saveButtonVisibility, downloadButtonVisibility,
    addImageButtonLabel, cleanButtonLabel, saveButtonLabel, downloadButtonLabel,
  } = component;

  const visibility = (
    addImageButtonVisibility || cleanButtonVisibility || saveButtonVisibility || downloadButtonVisibility
  );

  const clean = () => setImage('');

  const saveImage = async () => {
    const fileContent = await getImageBlob(cropperRef.current);

    onSave({ fileContent });
  };

  const downloadImage = () => {
    const croppedCanvasURL = cropperRef.current.getCroppedCanvas().toDataURL();

    download(croppedCanvasURL, 'cropped.png');
  };

  if (!image || !visibility) {
    return null;
  }

  return (
    <div className="header-toolbar">
      <div className="buttons-wrapper">
        { addImageButtonVisibility && (
          <label htmlFor={ uploadInputId }>{ addImageButtonLabel }</label>
        ) }

        <Button onClick={ clean } label={ cleanButtonLabel } visibility={ cleanButtonVisibility }/>
      </div>
      <div className="buttons-wrapper">
        <Button onClick={ saveImage } label={ saveButtonLabel } visibility={ saveButtonVisibility }/>
        <Button onClick={ downloadImage } label={ downloadButtonLabel } visibility={ downloadButtonVisibility }/>
      </div>
    </div>
  );
}

export function FooterToolbar({ cropperRef, image, toolbarVisibility, disabled }) {
  const toolbar = useMemo(() => {
    const zoomIn = () => cropperRef.current.zoom(0.1);
    const zoomOut = () => cropperRef.current.zoom(-0.1);
    const rotateLeft = () => cropperRef.current.rotate(-45);
    const rotateRight = () => cropperRef.current.rotate(45);

    const scaleX = () => {
      const newScaleX = -cropperRef.current.getImageData().scaleX;

      cropperRef.current.scaleX(newScaleX || -1);
    };

    const scaleY = () => {
      const newScaleY = -cropperRef.current.getImageData().scaleY;

      cropperRef.current.scaleY(newScaleY || -1);
    };

    return [
      [{ label: 'zoom_in', onClick: zoomIn }, { label: 'zoom_out', onClick: zoomOut }],
      [{ label: 'rotate_left', onClick: rotateLeft }, { label: 'rotate_right', onClick: rotateRight }],
      [{ label: 'swap_horiz', onClick: scaleX }, { label: 'swap_vert', onClick: scaleY }],
    ];
  }, [cropperRef]);

  if (!toolbarVisibility || !image) {
    return null;
  }

  return (
    <div className="footer-toolbar">
      { toolbar.map((buttons, index) => (
        <ButtonsGroup buttons={ buttons } key={ index } disabled={ disabled }/>
      )) }
    </div>
  );
}

function ButtonsGroup({ buttons, disabled }) {
  return (
    <div className="buttons-group">
      { buttons.map((button, index) => (
        <Button
          className="material-icons-round"
          onClick={ button.onClick }
          label={ button.label }
          visibility={ true }
          disabled={ disabled }
          key={ index }
        />
      )) }
    </div>
  );
}

function Button({ className, label, onClick, visibility, disabled }) {
  if (!visibility) {
    return null;
  }

  return (
    <button type="button" className={ className } onClick={ onClick } disabled={ disabled }>{ label }</button>
  );
}
