import { useState } from 'react';

const UploadStatus = {
  success  : 'success',
  uploading: 'uploading',
  undefined: 'undefined',
  error    : 'error',
};

export function useDropzone(component, eventHandlers) {
  const { overwriteFiles, targetDirectory, uploadOnDrop } = component;
  const { onDelete, onChange, fileNameLogic } = eventHandlers;

  const [files, setFiles] = useState([]);

  const updateFiles = filesList => {
    const updatedFiles = [];

    filesList.forEach(async item => {
      if (item.uploadStatus === UploadStatus.uploading) {
        item.uploadStatus = UploadStatus.undefined;

        try {
          const file = item.file;
          const fileName = await fileNameLogic({ file });
          const validFileName = ensureExtension(fileName, file);
          const directory = targetDirectory?.replace(/\/$/g, '').replace(/(.*)/, '$1/') || '';
          const path = directory + validFileName;

          await Backendless.Files.upload(file, path, overwriteFiles);

          item.uploadStatus = UploadStatus.success;
        } catch (error) {
          item.uploadStatus = UploadStatus.error;
          console.error(error.message);
        }
      }

      updatedFiles.push(item);

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
      if (file.uploadStatus === UploadStatus.success || file.valid === false) {
        updatedFiles.push(file);
      } else {
        updatedFiles.push({ ...file, uploadStatus: UploadStatus.uploading });
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

export function ensureMeasure(dimension) {
  return String(Number(dimension)) === dimension ? dimension + 'px' : dimension;
}

function ensureExtension(fileName, file) {
  if (!fileName) {
    return '';
  }

  const fileExtension = file.name.split('.').slice(-1)[0];

  if (!fileName.endsWith(fileExtension)) {
    return fileName.concat('.', fileExtension);
  }

  return fileName;
}
