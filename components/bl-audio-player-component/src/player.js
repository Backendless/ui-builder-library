import { Controls, TrackNavigation, TrackTime, VolumeControl } from './player-components';

export function Player(props) {
  const {
    audioRef,
    isMute,
    setIsMute,
    currentTrack,
    isPlaying,
    setIsPlaying,
    timer,
    volume,
    setVolume,
    index,
    setIndex,
    audioUrls,
  } = props;

  const {
    playerVisibility,
    titleVisibility,
    trackNavigationVisibility,
  } = props.component;

  if (!playerVisibility) {
    return null;
  }

  return (
    <div className="player-container">
      { titleVisibility && <span className="title">{ currentTrack.title }</span> }
      <TrackNavigation
        audioRef={ audioRef }
        currentTrack={ currentTrack }
        trackNavigationVisibility={ trackNavigationVisibility }
      />
      <div className="controls">
        <TrackTime audioRef={ audioRef } timer={ timer }/>
        <Controls
          audioRef={ audioRef }
          isPlaying={ isPlaying }
          setIsPlaying={ setIsPlaying }
          index={ index }
          setIndex={ setIndex }
          audioUrls={ audioUrls }
        />
        <VolumeControl
          isMute={ isMute }
          setIsMute={ setIsMute }
          volume={ volume }
          setVolume={ setVolume }
        />
      </div>
    </div>
  );
}
