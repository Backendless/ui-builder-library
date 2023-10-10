const TopTypes = [
  'NoHair', 'Eyepatch', 'Hat', 'Hijab', 'Turban', 'WinterHat1', 'WinterHat2', 'WinterHat3',
  'WinterHat4', 'LongHairBigHair', 'LongHairBob', 'LongHairBun', 'LongHairCurly', 'LongHairCurvy',
  'LongHairDreads', 'LongHairFrida', 'LongHairFro', 'LongHairFroBand', 'LongHairNotTooLong',
  'LongHairShavedSides', 'LongHairMiaWallace', 'LongHairStraight', 'LongHairStraight2',
  'LongHairStraightStrand', 'ShortHairDreads01', 'ShortHairDreads02', 'ShortHairFrizzle',
  'ShortHairShaggy', 'ShortHairShaggyMullet', 'ShortHairShortCurly', 'ShortHairShortFlat',
  'ShortHairShortRound', 'ShortHairShortWaved', 'ShortHairSides', 'ShortHairTheCaesar',
  'ShortHairTheCaesarSidePart',
];

const AccessoryTypes = [
  'Blank', 'Kurt', 'Prescription01', 'Prescription02', 'Round', 'Sunglasses', 'Wayfarers',
];

const HairColors = [
  'Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark', 'PastelPink', 'Platinum',
  'Red', 'SilverGray',
];

const FacialHairTypes = [
  'Blank', 'BeardMedium', 'BeardLight', 'BeardMajestic', 'MoustacheFancy', 'MoustacheMagnum',
];

const ClothesTypes = [
  'BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt', 'Hoodie', 'Overall',
  'ShirtCrewNeck', 'ShirtScoopNeck', 'ShirtVNeck',
];

const GraphicTypes = [
  'Bat', 'Bear', 'Blank', 'Cumbia', 'Deer', 'Diamond', 'Hola', 'Pizza', 'Resist', 'Selena',
  'Skull', 'SkullOutline',
];

const EyesTypes = [
  'Close', 'Cry', 'Default', 'Dizzy', 'EyeRoll', 'Happy', 'Hearts', 'Side', 'Squint',
  'Surprised', 'Wink', 'WinkWacky',
];

const BrowsTypes = [
  'Angry', 'AngryNatural', 'Default', 'DefaultNatural', 'FlatNatural', 'FrownNatural',
  'RaisedExcited', 'RaisedExcitedNatural', 'SadConcerned', 'SadConcernedNatural', 'UnibrowNatural',
  'UpDown', 'UpDownNatural',
];

const MouthTypes = [
  'Concerned', 'Default', 'Disbelief', 'Eating', 'Grimace', 'Sad', 'ScreamOpen', 'Serious',
  'Smile', 'Tongue', 'Twinkle', 'Vomit',
];

const SkinColors = [
  'Tanned', 'Yellow', 'Pale', 'Light', 'Brown', 'DarkBrown', 'Black',
];

const HatColors = [
  'Black', 'Blue01', 'Blue02', 'Blue03', 'Gray01', 'Gray02', 'Gray03', 'Heather',
  'PastelBlue', 'PastelGreen', 'PastelOrange', 'PastelRed', 'PastelYellow', 'Pink', 'Red', 'White',
];

// the order is important for handleRandomOptions
export const Properties = {
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

export const AvatarOptionsData = {
  [Properties.SKIN]             : SkinColors,
  [Properties.TOP]              : TopTypes,
  [Properties.HAIR_COLOR]       : HairColors,
  [Properties.HAT_COLOR]        : HatColors,
  [Properties.BROWS]            : BrowsTypes,
  [Properties.EYES]             : EyesTypes,
  [Properties.MOUTH]            : MouthTypes,
  [Properties.FACIAL_HAIR]      : FacialHairTypes,
  [Properties.FACIAL_HAIR_COLOR]: HairColors,
  [Properties.ACCESSORY]        : AccessoryTypes,
  [Properties.CLOTHES]          : ClothesTypes,
  [Properties.FABRIC_COLOR]     : HatColors,
  [Properties.GRAPHIC]          : GraphicTypes,
};

export const RANDOM_OPTION = 'Random';

export const CIRCLE_STYLE = 'circle';

export const BackgroundColors = {
  [Properties.BACKGROUND]  : 'transparent',
  [Properties.CIRCLE_COLOR]: '#E6E6E6',
};
