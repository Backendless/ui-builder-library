import { useState } from 'react';

import { Dropzone, FileItem, FullScreenPreview, VideoPreview } from './lib/dropzone-ui.min';
import { useDropzone, validate } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function DropzoneComponent({ component, eventHandlers }) {
  const {
    display, classList, style, acceptedFileTypes, onDropBehaviour, clickable, footerVisibility, headerVisibility, label,
    language, maxFiles, maxFileSize, minHeight, maxHeight, viewMode, disableScrollbar, uploadOnDrop, themeColor,
    cleanButtonVisibility, showInfoLayer, activeItems, preview, borderWidth, borderStyle, borderColor,
  } = component;
  const { onDrop, onChangeView, onClean } = eventHandlers;

  const [imageSrc, setImageSrc] = useState(undefined);
  const [videoSrc, setVideoSrc] = useState(undefined);
  const { files, updateFiles, onUploadFinish, handleDelete } = useDropzone(component, eventHandlers);

  const handleSee = imageSource => setImageSrc(imageSource);
  const handleWatch = videoSource => setVideoSrc(videoSource);
  const handleClean = validatedFiles => onClean({ validatedFiles });

  const borderStyles = {
    borderWidth: validate(borderWidth),
    borderStyle,
    borderColor,
  };

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-dropzone', classList) } style={ style }>
      <Dropzone
        style={ borderStyles }
        onChange={ updateFiles }
        value={ files }
        clickable={ clickable }
        onClean={ cleanButtonVisibility ? handleClean : false }
        accept={ acceptedFileTypes }
        maxFileSize={ maxFileSize }
        maxFiles={ maxFiles }
        label={ label }
        minHeight={ validate(minHeight) }
        maxHeight={ validate(maxHeight) }
        localization={ language }
        view={ viewMode === 'unset' ? false : viewMode }
        footer={ footerVisibility }
        header={ headerVisibility }
        url
        behaviour={ onDropBehaviour }
        uploadOnDrop={ uploadOnDrop }
        color={ themeColor }
        disableScroll={ disableScrollbar }
        onDrop={ filesList => onDrop({ filesList }) }
        onChangeView={ viewMode => onChangeView({ viewMode }) }
        onUploadFinish={ onUploadFinish }
      >
        { files?.map(file => (
          <FileItem
            { ...file }
            key={ file.id }
            onDelete={ handleDelete }
            onSee={ handleSee }
            onWatch={ handleWatch }
            alwaysActive={ activeItems }
            localization={ language }
            preview={ preview }
            info={ showInfoLayer }
            hd
          />
        )) }
      </Dropzone>
      <FullScreenPreview
        imgSource={ imageSrc }
        openImage={ imageSrc }
        onClose={ () => handleSee(undefined) }
      />
      <VideoPreview
        videoSrc={ videoSrc }
        openVideo={ videoSrc }
        onClose={ () => handleWatch(undefined) }
        controls
        autoplay
      />
    </div>
  );
}
