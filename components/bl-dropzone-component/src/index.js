import { useState } from 'react';

import { Dropzone, FileItem, FullScreenPreview, VideoPreview } from './lib/dropzone-ui.min';
import { ensureMeasure, useDropzone } from './helpers';

const { cn } = BackendlessUI.CSSUtils;

export default function DropzoneComponent({ component, eventHandlers }) {
  const { display, classList, style, acceptedFileTypes, onDropBehaviour, clickable, footerVisibility } = component;
  const { headerVisibility, label, language, maxFiles, maxFileSize, minHeight, maxHeight, viewMode } = component;
  const { disableScrollbar, themeColor, cleanButtonVisibility, showInfoLayer } = component;
  const { activeItems, preview, borderWidth, borderStyle, borderColor } = component;

  const { onDrop, onChangeView, onClean } = eventHandlers;

  const [imageSrc, setImageSrc] = useState();
  const [videoSrc, setVideoSrc] = useState();
  const { files, updateFiles, handleDelete } = useDropzone(component, eventHandlers);

  const handleSee = imageSource => setImageSrc(imageSource);
  const handleWatch = videoSource => setVideoSrc(videoSource);
  const handleClean = validatedFiles => onClean({ validatedFiles });

  const borderStyles = {
    borderWidth: ensureMeasure(borderWidth),
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
        minHeight={ ensureMeasure(minHeight) }
        maxHeight={ ensureMeasure(maxHeight) }
        localization={ language }
        view={ viewMode === 'unset' ? false : viewMode }
        footer={ footerVisibility }
        header={ headerVisibility }
        behaviour={ onDropBehaviour }
        color={ themeColor }
        disableScroll={ disableScrollbar }
        onDrop={ filesList => onDrop({ filesList }) }
        onChangeView={ viewMode => onChangeView({ viewMode }) }
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
