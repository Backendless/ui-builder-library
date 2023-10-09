import { data as characterOptions } from './avatar-data';

const RANDOM_OPTION = 'Random';

const OptionsKeys = {
  BACKGROUND        : 'background',
  CIRCLE_COLOR      : 'circleColor',
  SKIN              : 'skinColors',
  TOP               : 'topTypes',
  HAIR_COLOR        : 'hairColors',
  HAT_COLOR         : 'hatColors',
  BROWS             : 'browsTypes',
  EYES              : 'eyesTypes',
  MOUTH             : 'mouthTypes',
  FACIAL_HAIR       : 'facialHairTypes',
  FACIAL_HAIR_COLOR : 'hairColors',
  ACCESSORY         : 'accessoryTypes',
  CLOTHES           : 'clothesTypes',
  FABRIC_COLOR      : 'hatColors',
  GRAPHIC           : 'graphicTypes',
};

// the order is important for handleRandomOptions
const ComponentOptionsKeys = {
  BACKGROUND        : 'background',
  CIRCLE_COLOR      : 'circleColor',
  SKIN              : 'skin',
  TOP               : 'top',
  HAIR_COLOR        : 'hairColor',
  HAT_COLOR         : 'hatColor',
  BROWS             : 'brows',
  EYES              : 'eyes',
  MOUTH             : 'mouth',
  FACIAL_HAIR       : 'facialHair',
  FACIAL_HAIR_COLOR : 'facialHairColor',
  ACCESSORY         : 'accessory',
  CLOTHES           : 'clothes',
  FABRIC_COLOR      : 'fabricColor',
  GRAPHIC           : 'graphic',
};

export const DefaultOptions = {
  BACKGROUND       : 'transparent',
  CIRCLE_COLOR     : '#E6E6E6',
  SKIN             : getRandomValue(OptionsKeys.SKIN),
  TOP              : getRandomValue(OptionsKeys.TOP),
  HAIR_COLOR       : getRandomValue(OptionsKeys.HAIR_COLOR),
  HAT_COLOR        : getRandomValue(OptionsKeys.HAT_COLOR),
  BROWS            : getRandomValue(OptionsKeys.BROWS),
  EYES             : getRandomValue(OptionsKeys.EYES),
  MOUTH            : getRandomValue(OptionsKeys.MOUTH),
  FACIAL_HAIR      : getRandomValue(OptionsKeys.FACIAL_HAIR),
  FACIAL_HAIR_COLOR: getRandomValue(OptionsKeys.FACIAL_HAIR_COLOR),
  ACCESSORY        : getRandomValue(OptionsKeys.ACCESSORY),
  CLOTHES          : getRandomValue(OptionsKeys.CLOTHES),
  FABRIC_COLOR     : getRandomValue(OptionsKeys.FABRIC_COLOR),
  GRAPHIC          : getRandomValue(OptionsKeys.GRAPHIC),
};

const OptionsList = [
  {
    key: ComponentOptionsKeys.BACKGROUND,
    categoryKey: OptionsKeys.BACKGROUND,
    validate: false,
    defaultValue: DefaultOptions.BACKGROUND,
  },
  {
    key: ComponentOptionsKeys.CIRCLE_COLOR,
    categoryKey: OptionsKeys.CIRCLE_COLOR,
    validate: false,
    defaultValue: DefaultOptions.CIRCLE_COLOR,
  },
  {
    key: ComponentOptionsKeys.SKIN,
    categoryKey: OptionsKeys.SKIN,
    validate: true,
    defaultValue: DefaultOptions.SKIN,
  },
  {
    key: ComponentOptionsKeys.TOP,
    categoryKey: OptionsKeys.TOP,
    validate: true,
    defaultValue: DefaultOptions.TOP,
  },
  {
    key: ComponentOptionsKeys.HAIR_COLOR,
    categoryKey: OptionsKeys.HAIR_COLOR,
    validate: true,
    defaultValue: DefaultOptions.HAIR_COLOR,
  },
  {
    key: ComponentOptionsKeys.HAT_COLOR,
    categoryKey: OptionsKeys.HAT_COLOR,
    validate: true,
    defaultValue: DefaultOptions.HAT_COLOR,
  },
  {
    key: ComponentOptionsKeys.BROWS,
    categoryKey: OptionsKeys.BROWS,
    validate: true,
    defaultValue: DefaultOptions.BROWS,
  },
  {
    key: ComponentOptionsKeys.EYES,
    categoryKey: OptionsKeys.EYES,
    validate: true,
    defaultValue: DefaultOptions.EYES,
  },
  {
    key: ComponentOptionsKeys.MOUTH,
    categoryKey: OptionsKeys.MOUTH,
    validate: true,
    defaultValue: DefaultOptions.MOUTH,
  },
  {
    key: ComponentOptionsKeys.FACIAL_HAIR,
    categoryKey: OptionsKeys.FACIAL_HAIR,
    validate: true,
    defaultValue: DefaultOptions.FACIAL_HAIR,
  },
  {
    key: ComponentOptionsKeys.FACIAL_HAIR_COLOR,
    categoryKey: OptionsKeys.FACIAL_HAIR_COLOR,
    validate: true,
    defaultValue: DefaultOptions.FACIAL_HAIR_COLOR,
  },
  {
    key: ComponentOptionsKeys.ACCESSORY,
    categoryKey: OptionsKeys.ACCESSORY,
    validate: true,
    defaultValue: DefaultOptions.ACCESSORY,
  },
  {
    key: ComponentOptionsKeys.CLOTHES,
    categoryKey: OptionsKeys.CLOTHES,
    validate: true,
    defaultValue: DefaultOptions.CLOTHES,
  },
  {
    key: ComponentOptionsKeys.FABRIC_COLOR,
    categoryKey: OptionsKeys.FABRIC_COLOR,
    validate: true,
    defaultValue: DefaultOptions.FABRIC_COLOR,
  },
  {
    key: ComponentOptionsKeys.GRAPHIC,
    categoryKey: OptionsKeys.GRAPHIC,
    validate: true,
    defaultValue: DefaultOptions.GRAPHIC,
  },
];

export const ActionsKeys = {
  getTopTypes        : characterOptions[OptionsKeys.TOP],
  getBrowsTypes      : characterOptions[OptionsKeys.BROWS],
  getEyesTypes       : characterOptions[OptionsKeys.EYES],
  getMouthTypes      : characterOptions[OptionsKeys.MOUTH],
  getFacialHairTypes : characterOptions[OptionsKeys.FACIAL_HAIR],
  getAccessoryTypes  : characterOptions[OptionsKeys.ACCESSORY],
  getClothesTypes    : characterOptions[OptionsKeys.CLOTHES],
  getGraphicTypes    : characterOptions[OptionsKeys.GRAPHIC],
  getSkinColors      : characterOptions[OptionsKeys.SKIN],
  getHairColors      : characterOptions[OptionsKeys.HAIR_COLOR],
  getHatColors       : characterOptions[OptionsKeys.HAT_COLOR],
  getFacialHairColors: characterOptions[OptionsKeys.FACIAL_HAIR_COLOR],
  getFabricColors    : characterOptions[OptionsKeys.FABRIC_COLOR],
};

function getRandomValue(categoryKey) {
  const category = characterOptions[categoryKey];

  if (!category || category.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * category.length);

  return category[randomIndex];
}

function isValueValid(categoryKey, value) {
  const isValid = characterOptions[categoryKey]?.includes(value);

  if (value && value !== RANDOM_OPTION && !isValid) {
    console.warn(
      `The "${ categoryKey }" category does not contain the "${ value }" parameter.` +
      'The random parameter will be applied.'
    );
  }

  return isValid;
}

export const handleOptions = component => {
  return OptionsList.reduce((acc, { key, categoryKey, validate, defaultValue }) => {
    let value = component[key] || defaultValue;

    if(validate && !isValueValid(categoryKey, component[key])) {
      value = defaultValue;
    }

    acc[key] = value;

    return acc;
  }, {});
};

export const handleRandomOptions = (...options) => {
  const component = {};

  Object.values(ComponentOptionsKeys).forEach((key, index) => component[key] = options[index]);

  return OptionsList.reduce((acc, { key, categoryKey, validate, defaultValue }) => {
    let value = component[key];

    if (!value && !validate) {
      value = defaultValue;
    } else if (!value || (validate && !isValueValid(categoryKey, component[key]))) {
      value = getRandomValue(categoryKey);
    }

    acc[key] = value;

    return acc;
  }, {});
};
