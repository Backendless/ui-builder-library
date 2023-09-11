import { data } from './avatar-data';

const DefaultOptions = {
  BACKGROUND       : 'transparent',
  CIRCLE_COLOR     : '#E6E6E6',
  SKIN             : getRandomValue('skinColors'),
  HAIR_COLOR       : getRandomValue('hairColors'),
  HAT_COLOR        : getRandomValue('hatColors'),
  FACIAL_HAIR_COLOR: getRandomValue('hairColors'),
  FABRIC_COLOR     : getRandomValue('hatColors'),
  TOP              : getRandomValue('topTypes'),
  ACCESSORY        : getRandomValue('accessoryTypes'),
  MOUTH            : getRandomValue('mouthTypes'),
  FACIAL_HAIR      : getRandomValue('facialHairTypes'),
  CLOTHES          : getRandomValue('clothesTypes'),
  EYES             : getRandomValue('eyesTypes'),
  BROWS            : getRandomValue('browsTypes'),
  GRAPHIC          : getRandomValue('graphicTypes'),
};

export const ActionsKeys = {
  getTopTypes        : data['topTypes'],
  getBrowsTypes      : data['browsTypes'],
  getEyesTypes       : data['eyesTypes'],
  getMouthTypes      : data['mouthTypes'],
  getFacialHairTypes : data['facialHairTypes'],
  getAccessoryTypes  : data['accessoryTypes'],
  getClothesTypes    : data['clothesTypes'],
  getGraphicTypes    : data['graphicTypes'],
  getSkinColors      : data['skinColors'],
  getHairColors      : data['hairColors'],
  getHatColors       : data['hatColors'],
  getFacialHairColors: data['hairColors'],
  getFabricColors    : data['hatColors'],
};

function getRandomValue(categoryKey) {
  const category = data[categoryKey];

  if (!category || category.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * category.length);
  return category[randomIndex];
}

function isValueValid(categoryKey, value) {
  const category = data[categoryKey];
  return category && category.includes(value);
}

export const handleOptions = (background, circleColor, skin, top, hairColor, hatColor, brows, eyes,
  mouth, facialHair, facialHairColor, accessory, clothes, fabricColor, graphic) => ({
  top: isValueValid('topTypes', top) ? top : DefaultOptions.TOP,
  accessory: isValueValid('accessoryTypes', accessory) ? accessory : DefaultOptions.ACCESSORY,
  mouth: isValueValid('mouthTypes', mouth) ? mouth : DefaultOptions.MOUTH,
  facialHair: isValueValid('facialHairTypes', facialHair) ? facialHair : DefaultOptions.FACIAL_HAIR,
  clothes: isValueValid('clothesTypes', clothes) ? clothes : DefaultOptions.CLOTHES,
  graphic: isValueValid('graphicTypes', graphic) ? graphic : DefaultOptions.GRAPHIC,
  eyes: isValueValid('eyesTypes', eyes) ? eyes : DefaultOptions.EYES,
  brows: isValueValid('browsTypes', brows) ? brows : DefaultOptions.BROWS,
  background: background || DefaultOptions.BACKGROUND,
  circleColor: circleColor || DefaultOptions.CIRCLE_COLOR,
  skin: isValueValid('skinColors', skin) ? skin : DefaultOptions.SKIN,
  hairColor: isValueValid('hairColors', hairColor) ? hairColor : DefaultOptions.HAIR_COLOR,
  hatColor: isValueValid('hatColors', hatColor) ? hatColor : DefaultOptions.HAT_COLOR,
  facialHairColor: isValueValid('hairColors', facialHairColor) ? facialHairColor : DefaultOptions.FACIAL_HAIR_COLOR,
  fabricColor: isValueValid('hatColors', fabricColor) ? fabricColor : DefaultOptions.FABRIC_COLOR,
});

export const handleRandomOptions = (background, circleColor, skin, top, hairColor, hatColor, brows, eyes,
  mouth, facialHair, facialHairColor, accessory, clothes, fabricColor, graphic) => ({
  top: isValueValid('topTypes', top) ? top : getRandomValue('topTypes'),
  accessory: isValueValid('accessoryTypes', accessory) ? accessory : getRandomValue('accessoryTypes'),
  mouth: isValueValid('mouthTypes', mouth) ? mouth : getRandomValue('mouthTypes'),
  facialHair: isValueValid('facialHairTypes', facialHair) ? facialHair : getRandomValue('facialHairTypes'),
  clothes: isValueValid('clothesTypes', clothes) ? clothes : getRandomValue('clothesTypes'),
  graphic: isValueValid('graphicTypes', graphic) ? graphic : getRandomValue('graphicTypes'),
  eyes: isValueValid('eyesTypes', eyes) ? eyes : getRandomValue('eyesTypes'),
  brows: isValueValid('browsTypes', brows) ? brows : getRandomValue('browsTypes'),
  background: background || DefaultOptions.BACKGROUND,
  circleColor: circleColor || DefaultOptions.CIRCLE_COLOR,
  skin: isValueValid('skinColors', skin) ? skin : getRandomValue('skinColors'),
  hairColor: isValueValid('hairColors', hairColor) ? hairColor : getRandomValue('hairColors'),
  hatColor: isValueValid('hatColors', hatColor) ? hatColor : getRandomValue('hatColors'),
  facialHairColor: isValueValid('hairColors', facialHairColor) ? facialHairColor : getRandomValue('hairColors'),
  fabricColor: isValueValid('hatColors', fabricColor) ? fabricColor : getRandomValue('hatColors'),
});
