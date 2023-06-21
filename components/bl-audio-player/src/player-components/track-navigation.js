import { useRef } from 'react';

export function TrackNavigation(props) {
  const { audioRef, currentTrack, trackNavigationVisibility } = props;

  const isAudioDurationInfinite = audioRef.current?.duration === Infinity;

  const navigationRef = useRef();

  const styles = {
    width: isAudioDurationInfinite ? '100%' : `${ currentTrack.progress }%`,
  };

  const setProgress = e => {
    if (isAudioDurationInfinite) {
      return;
    }

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
