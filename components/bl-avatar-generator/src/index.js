import { useEffect, useRef, useState } from 'react';
import { getSVGFile, getPNGFile, getJPEGFile } from './svg-utils';
import { data } from './avatar-data';
import { ActionsKeys, handleOptions, handleRandomOptions } from './helpers';
import { Avatar } from './avatar';

const { cn } = BackendlessUI.CSSUtils;

export default function AvatarGeneratorComponent({ component, eventHandlers, elRef }) {
  const {
    style, classList, display, avatarStyle, background, circleColor, skin, top, hairColor, hatColor,
    brows, eyes, mouth, facialHair, facialHairColor, accessory, clothes, fabricColor, graphic,
  } = component;
  const { onClick } = eventHandlers;

  const svgRef = useRef(null);

  const [avatarData, setAvatarData] = useState(handleOptions(background, circleColor, skin, top, hairColor, hatColor,
    brows, eyes, mouth, facialHair, facialHairColor, accessory, clothes, fabricColor, graphic));

  useEffect(() => {
    setAvatarData(handleOptions(background, circleColor, skin, top, hairColor, hatColor,brows, eyes,
      mouth, facialHair, facialHairColor, accessory, clothes, fabricColor, graphic));
}, [background, circleColor, skin, top, hairColor, hatColor, brows, eyes,
    mouth, facialHair, facialHairColor, accessory, clothes, fabricColor, graphic]);

  useEffect(() => {
    svgRef.current = display && document.querySelector('#AvatarSVG');
  }, [display]);

  component.random = (background, circleColor, skin, top, hairColor, hatColor, brows, eyes,
    mouth, facialHair, facialHairColor, accessory, clothes, fabricColor, graphic) => {
    setAvatarData(handleRandomOptions(background, circleColor, skin, top, hairColor, hatColor, brows, eyes,
      mouth, facialHair, facialHairColor, accessory, clothes, fabricColor, graphic));
  };

  component.getAllOptionsData = () => data;
  component.getAvatarGeneratedData = () => avatarData;

  Object.assign(component, ...Object.keys(ActionsKeys).map((key) => ({
    [key]: () => ActionsKeys[key]
  })));

  Object.assign(component, {
    getSVG: (fileName) => getSVGFile(fileName, svgRef.current),
    getPNG: (fileName) => getPNGFile(fileName, svgRef.current),
    getJPEG: (fileName) => getJPEGFile(fileName, svgRef.current),
  });

  if (!display) {
    return null;
  }

  return (
    <div
      className={ cn('bl-customComponent-avatar-generator', classList) }
      ref={ elRef } style={ style } onClick={ onClick }>
      <Avatar avatarStyle={ avatarStyle } avatarData={ avatarData }/>
    </div>
  );
}
