import { useEffect, useMemo, useRef, useState } from 'react';

import { Avatar } from './avatar';
import { AvatarOptionsData } from './avatar-data';
import { AccessoryTypes, BrowsTypes, ClothesTypes, EyesTypes, FacialHairTypes, GraphicTypes, HairColors, HatColors, MouthTypes, Nose, SkinColors, TopTypes } from './avatar-parts';
import { getJPEGFile, getPNGFile, getSVGFile, handleOptions, handleRandomOptions } from './helpers';

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
    getAllOptionsData: () => AvatarOptionsData,
    getPropertyOptions: propertyName => AvatarOptionsData[propertyName],
    getSVG: fileName => getSVGFile(fileName, svgRef.current),
    getPNG: fileName => getPNGFile(fileName, svgRef.current),
    getJPEG: fileName => getJPEGFile(fileName, svgRef.current) }
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

        <AvatarChildren avatarData={ avatarData }/>

      </Avatar>
    </div>
  );
}

const AvatarChildren = ({ avatarData }) => {
  const {
    top, hairColor, hatColor, brows, eyes, mouth, facialHair,
    facialHairColor, accessory, clothes, fabricColor, graphic,
  } = avatarData;

  const ClothesComponent = useMemo(() => ClothesTypes[clothes], [clothes]);
  const GraphicComponent = useMemo(() => GraphicTypes[graphic], [graphic]);
  const BrowsComponent = useMemo(() => BrowsTypes[brows], [brows]);
  const EyesComponent = useMemo(() => EyesTypes[eyes], [eyes]);
  const MouthComponent = useMemo(() => MouthTypes[mouth], [mouth]);
  const TopComponent = useMemo(() => TopTypes[top], [top]);
  const FacialHairComponent = useMemo(() => FacialHairTypes[facialHair], [facialHair]);
  const AccessoryComponent = useMemo(() => AccessoryTypes[accessory], [accessory]);

  return (
    <>
      <ClothesComponent fabricColor={ HatColors[fabricColor] }/>
      <GraphicComponent/>
      <BrowsComponent/>
      <EyesComponent/>
      <Nose/>
      <MouthComponent/>
      <TopComponent hatColor={ HatColors[hatColor] } hairColor={ HairColors[hairColor] }/>
      <FacialHairComponent facialHairColor={ HairColors[facialHairColor] }/>
      <AccessoryComponent/>
    </>
  );
};
