import { AvatarOptionsData, BackgroundColors, Properties, RANDOM_OPTION } from './avatar-data';

const DefaultOptions = Object.keys(Properties).reduce((options, prop) => {
  options[Properties[prop]] = getRandomCategoryValue(Properties[prop]) || BackgroundColors[Properties[prop]];

  return options;
}, {});

const baseOptionResolver = key => ({
  key,
  defaultValue: DefaultOptions[key],
  validate: toValidate(key),
});

function toValidate(key) {
  if (key === Properties.BACKGROUND || key === Properties.CIRCLE_COLOR) {
    return false;
  }

  return true;
}

const OptionsList = Object.values(Properties).map(key => baseOptionResolver(key));

function getRandomCategoryValue(categoryKey) {
  const category = AvatarOptionsData[categoryKey];

  if (!category || category.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * category.length);

  return category[randomIndex];
}

function isValueValid(categoryKey, value) {
  const isValid = AvatarOptionsData[categoryKey]?.includes(value);

  if (value && value !== RANDOM_OPTION && !isValid) {
    console.warn(
      `The "${ categoryKey }" category does not contain the "${ value }" parameter.` +
      'The random parameter will be applied.'
    );
  }

  return isValid;
}

export const handleOptions = component => {
  return OptionsList.reduce((acc, { key, validate, defaultValue }) => {
    let value = component[key] || defaultValue;

    if(validate && !isValueValid(key, component[key])) {
      value = defaultValue;
    }

    acc[key] = value;

    return acc;
  }, {});
};

export const handleRandomOptions = (...options) => {
  const component = {};

  Object.values(Properties).forEach((key, index) => component[key] = options[index]);

  return OptionsList.reduce((acc, { key, validate, defaultValue }) => {
    let value = component[key];

    if (!value && !validate) {
      value = defaultValue;
    } else if (!value || (validate && !isValueValid(key, component[key]))) {
      value = getRandomCategoryValue(key);
    }

    acc[key] = value;

    return acc;
  }, {});
};

function getSVGElement(svgElement) {
  if (!svgElement) {
    throw new Error('SVG element not found');
  }

  return new XMLSerializer().serializeToString(svgElement);
}

export function getSVGFile(fileName, svgElement) {
  const svgString = getSVGElement(svgElement);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });

  return new File([svgBlob], `${ fileName }.svg`, { type: 'image/svg+xml' });
}

export function getPNGFile(fileName, svgElement) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const svgString = getSVGElement(svgElement);
    const svgDataUrl = `data:image/svg+xml;base64,${ btoa(unescape(encodeURIComponent(svgString))) }`;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      context.drawImage(img, 0, 0);

      canvas.toBlob(blob => {
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
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(blob => {
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
