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
