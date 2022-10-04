import { useState } from 'react';

export function useDropzone(component, eventHandlers) {
  const { overwriteFiles, targetDirectory, uploadOnDrop } = component;
  const { onDelete, onChange } = eventHandlers;

  const [files, setFiles] = useState([]);

  const updateFiles = filesList => {
    const updatedFiles = [];

    filesList.forEach(async file => {
      if (file.uploadStatus === 'uploading') {
        file.uploadStatus = undefined;

        try {
          await Backendless.Files.upload(file.file, targetDirectory || '', overwriteFiles);

          file.uploadStatus = 'success';

        } catch (error) {
          file.uploadStatus = 'error';
          console.error(error.message);
        }
      }

      updatedFiles.push(file);

      if (updatedFiles.length === filesList.length) {
        setFiles(updatedFiles);
      }
    });

    onChange({ filesList });
  };

  const onUploadFinish = () => {
    if (uploadOnDrop) {
      return;
    }

    const updatedFiles = [];

    files.forEach(file => {
      if (file.uploadStatus === 'success' || file.valid === false) {
        updatedFiles.push(file);
      } else {
        updatedFiles.push({ ...file, uploadStatus: 'uploading' });
      }
    });

    setFiles(updatedFiles);
  };

  const handleDelete = fileID => {
    setFiles(files.filter(file => file.id !== fileID));
    onDelete({ fileID });
  };

  return { files, updateFiles, onUploadFinish, handleDelete };
}

export function validate(dimension) {
  return String(Number(dimension)) === dimension ? dimension + 'px' : dimension;
}
