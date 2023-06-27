import { useState } from 'react';

const UploadStatus = {
  success  : 'success',
  uploading: 'uploading',
  error    : 'error',
};

export function useDropzone(component, eventHandlers) {
  const { overwriteFiles, targetDirectory, uploadOnDrop } = component;
  const { onDelete, onChange, fileNameLogic, onUpload, onUploadFailed } = eventHandlers;

  const [files, setFiles] = useState([]);

  const uploadFiles = async files => {
    const updatedFiles = [];

    const filesList = files.map(fileItem => {
      const shouldUpload = fileItem.valid === true && fileItem.uploadStatus !== UploadStatus.success;

      return shouldUpload ? { ...fileItem, uploadStatus: UploadStatus.uploading } : fileItem;
    });

    setFiles(filesList);

    for (const fileItem of filesList) {
      if (fileItem.uploadStatus === UploadStatus.uploading) {
        try {
          const file = fileItem.file;

          if (onUpload.hasLogic) {
            await onUpload({ file });
          } else {
            const fileName = await fileNameLogic({ file });
            const validFileName = ensureExtension(fileName, file);
            const directory = targetDirectory?.replace(/\/$/g, '').replace(/(.*)/, '$1/') || '';
            const path = directory + validFileName;

            await Backendless.Files.upload(file, path, overwriteFiles);
          }

          fileItem.uploadStatus = UploadStatus.success;
        } catch (error) {
          fileItem.uploadStatus = UploadStatus.error;
          onUploadFailed({ error });
        }
      }

      updatedFiles.push(fileItem);
    }

    setFiles(updatedFiles);
  };

  const updateFiles = filesList => {
    setFiles(filesList);
    onChange({ filesList });

    if (uploadOnDrop) {
      uploadFiles(filesList);
    }
  };

  const handleDelete = fileID => {
    setFiles(files.filter(file => file.id !== fileID));
    onDelete({ fileID });
  };

  component.uploadFiles = () => uploadFiles(files);

  return { files, updateFiles, handleDelete };
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
