import { useEffect, useRef, useState } from 'react';

import { Avatar } from './avatar';
import { data } from './avatar-data';
import {
AccessoryTypes, BrowsTypes, ClothesTypes,
EyesTypes, FacialHairTypes,   GraphicTypes, HairColors, HatColors, MouthTypes,   Nose, SkinColors,
TopTypes } from './avatar-parts';
import { ActionsKeys, handleOptions, handleRandomOptions } from './helpers';
import { getJPEGFile, getPNGFile, getSVGFile } from './svg-utils';

const { cn } = BackendlessUI.CSSUtils;

export default function AvatarGeneratorComponent({ component, eventHandlers, elRef }) {
  const {
    style, classList, display, avatarStyle, background, circleColor, skin, top, hairColor, hatColor,
    brows, eyes, mouth, facialHair, facialHairColor, accessory, clothes, fabricColor, graphic,
  } = component;
  const { onClick } = eventHandlers;

  const svgRef = useRef(null);

  const [avatarData, setAvatarData] = useState(() => handleOptions(component));

  useEffect(() => {
    setAvatarData(handleOptions(component));
  }, [background, circleColor, skin, top, hairColor, hatColor, brows, eyes,
    mouth, facialHair, facialHairColor, accessory, clothes, fabricColor, graphic]);

  Object.assign(component, {
    random: (...options) => setAvatarData(handleRandomOptions(...options)),
    getAvatarGeneratedData: () => avatarData,
    getAllOptionsData: () => data,
    getSVG: fileName => getSVGFile(fileName, svgRef.current),
    getPNG: fileName => getPNGFile(fileName, svgRef.current),
    getJPEG: fileName => getJPEGFile(fileName, svgRef.current) },
    ...Object.keys(ActionsKeys).map(key => ({ [key]: () => ActionsKeys[key] }))
  );

  if (!display) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-avatar-generator', classList) }
      ref={ elRef }
      style={ style }
      onClick={ onClick }>

      <Avatar
        avatarStyle={ avatarStyle }
        background={ avatarData.background }
        circleColor={ avatarData.circleColor }
        skin={ SkinColors[avatarData.skin] }
        svgRef={ svgRef }>

        { avatarChildren(avatarData) }

      </Avatar>
    </div>
  );
}

const avatarChildren = avatarData => {
  const {
    top, hairColor, hatColor, brows, eyes, mouth, facialHair,
    facialHairColor, accessory, clothes, fabricColor, graphic,
  } = avatarData;

  const ClothesComponent = ClothesTypes[clothes];
  const GraphicComponent = GraphicTypes[graphic];
  const BrowsComponent = BrowsTypes[brows];
  const EyesComponent = EyesTypes[eyes];
  const MouthComponent = MouthTypes[mouth];
  const TopComponent = TopTypes[top];
  const FacialHairComponent = FacialHairTypes[facialHair];
  const AccessoryComponent = AccessoryTypes[accessory];

  return (
    <>
      <ClothesComponent fabricColor={ HatColors[fabricColor] } />
      <GraphicComponent />
      <BrowsComponent />
      <EyesComponent />
      <Nose />
      <MouthComponent />
      <TopComponent hatColor={ HatColors[hatColor] } hairColor={ HairColors[hairColor] } />
      <FacialHairComponent facialHairColor={ HairColors[facialHairColor] } />
      <AccessoryComponent />
    </>
  );
};
