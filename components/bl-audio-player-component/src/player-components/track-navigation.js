import { useRef } from 'react';

export function TrackNavigation(props) {
  const { audioRef, currentTrack, trackNavigationVisibility } = props;
  const navigationRef = useRef();
  
  const styles = {
    width: `${ currentTrack.progress }%`,
  };

  const setProgress = e => {
    const width = navigationRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const progress = offset / width;

    audioRef.current.currentTime = progress * audioRef.current.duration;
  };

  if (!trackNavigationVisibility) {
    return null;
  }

  return (
    <div className="wrapper">
      <div className="track-navigation" ref={ navigationRef } onClick={ setProgress }>
        <div className="seek-bar" style={ styles }></div>
      </div>
    </div>
  );
}
