export const FALLBACK_IMAGE = 'data:image/jpeg;base64,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' +
  'Iz//Z';

const ImageOrientation = {
  LANDSCAPE: 'landscape',
  PORTRAIT : 'portrait',
};

const ImageFitOptions = {
  UNSET      : 'unset',
  CENTER     : 'center',
  ORIENTATION: 'orientation',
};

const ImageDimensions = {
  FULL_WIDTH : { width: '100%' },
  FULL_HEIGHT: { height: '100%' },
};

const ImageDimensionsMap = {
  [ImageOrientation.LANDSCAPE]: {
    [ImageFitOptions.CENTER]     : ImageDimensions.FULL_HEIGHT,
    [ImageFitOptions.ORIENTATION]: ImageDimensions.FULL_WIDTH,
  },
  [ImageOrientation.PORTRAIT] : {
    [ImageFitOptions.ORIENTATION]: ImageDimensions.FULL_HEIGHT,
    [ImageFitOptions.CENTER]     : ImageDimensions.FULL_WIDTH,
  },
};

export function uploadImage(event, setImageSource, onUpload) {
  event.preventDefault();

  const selectedFile = event.target?.files[0];
  const type = selectedFile.type;

  if (!type.includes('image')) {
    return;
  }

  const reader = new FileReader();

  reader.readAsDataURL(selectedFile);
  reader.onload = () => setImageSource(reader.result);

  onUpload({ selectedFile });

  event.target.value = ''; // needed to reset the image after uploading
}

export async function defineImageDimensions(imageSource, smartImageFit, setDimensions) {
  if (smartImageFit === ImageFitOptions.UNSET) {
    return setDimensions(ImageDimensions.FULL_WIDTH);
  }

  try {
    const orientation = await getImageOrientation(imageSource);
    const imageDimensions = ImageDimensionsMap[orientation][smartImageFit];

    setDimensions(imageDimensions);
  } catch (error) {
    console.error(error);
  }
}

function getImageOrientation(imageSource) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.src = imageSource;
    image.onerror = () => reject('Failed to load the image');
    image.onload = () => {
      const { width, height } = image;

      resolve(width > height ? ImageOrientation.LANDSCAPE : ImageOrientation.PORTRAIT);
    };
  });
}
