import { useEffect, useRef, useState } from 'react';

import { Avatar } from './avatar';
import { data } from './avatar-data';
import { ActionsKeys, handleOptions, handleRandomOptions } from './helpers';
import { getSVGFile, getPNGFile, getJPEGFile } from './svg-utils';

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
    random: (background, circleColor, skin, top, hairColor, hatColor, brows, eyes,
      mouth, facialHair, facialHairColor, accessory, clothes, fabricColor, graphic) => {
      setAvatarData(handleRandomOptions(background, circleColor, skin, top, hairColor, hatColor, brows, eyes,
        mouth, facialHair, facialHairColor, accessory, clothes, fabricColor, graphic));
    },
    getAvatarGeneratedData: () => avatarData,
    getAllOptionsData: () => data,
    getSVG: fileName => getSVGFile(fileName, svgRef.current),
    getPNG: fileName => getPNGFile(fileName, svgRef.current),
    getJPEG: fileName => getJPEGFile(fileName, svgRef.current) },
    ...Object.keys(ActionsKeys).map(key => ({ [key]: () => ActionsKeys[key] })),
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
      <Avatar avatarStyle={ avatarStyle } avatarData={ avatarData } svgRef={ svgRef }/>
    </div>
  );
}
