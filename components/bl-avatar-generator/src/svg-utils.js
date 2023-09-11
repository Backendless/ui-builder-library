function getSVGElement(svgElement) {
  if (!svgElement) {
    throw new Error('SVG element not found');
  }

  return new XMLSerializer().serializeToString(svgElement);
}

export function getSVGFile(fileName, svgElement) {
  const svgString = getSVGElement(svgElement);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
  const svgFile = new File([svgBlob], `${ fileName }.svg`, { type: 'image/svg+xml' });

  return svgFile;
}

export function getPNGFile(fileName, svgElement) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const svgString = getSVGElement(svgElement);
    const svgDataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;

      context.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const pngFile = new File([blob], `${ fileName }.png`, { type: 'image/png' });
          resolve(pngFile);
        } else {
          reject(new Error('Failed to create PNG'));
        }
      }, 'image/png');
    };

    img.src = svgDataUrl;
  });
}

export function getJPEGFile(fileName, svgElement) {
  return new Promise((resolve, reject) => {
    const svgString = getSVGElement(svgElement);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        const jpgBlob = new Blob([blob], { type: 'image/jpeg' });
        const jpgFile = new File([jpgBlob], `${ fileName }.jpeg`, { type: 'image/jpeg' });
        resolve(jpgFile);
      }, 'image/jpeg', 1.0);
    };

    img.onerror = () => {
      reject(new Error('Image loading error'));
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
  });
}
