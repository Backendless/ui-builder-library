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

export function getUploadLabel(elRef, label) {
  if (!label) {
    return (<UploadIcon/>);
  }

  const { offsetWidth, offsetHeight } = elRef.current;

  const labelElement = document.createElement('span');

  labelElement.textContent = label;

  elRef.current.appendChild(labelElement);

  const labelFits = labelElement.offsetWidth <= offsetWidth && labelElement.offsetHeight <= offsetHeight;

  elRef.current.removeChild(labelElement);

  return labelFits ? label : (<UploadIcon/>);
}

function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 8v8M8 12h8"/>
    </svg>
  );
}
