export const createImagesData = imagesData => {
  const imagesArray = imagesData.replace(/\s/g, '');

  if (imagesArray) {
    return imagesArray.split(',').map(img => ({
      url:img,
    }));
  }

  return [];
};