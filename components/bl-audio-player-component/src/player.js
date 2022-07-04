import { ControlButtons, TrackNavigation, TrackTime, VolumeControl } from './components';

export function Player(props) {
  const {
    isMute,
    setIsMute,
    audioRef,
    tracks,
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    timer,
    volume,
    setVolume,
  } = props;

  const {
    playerVisibility,
    titleVisibility,
    trackNavigationVisibility,
    multipleAudioPlayer,
    playerWidth,
  } = props.component;

  if (!playerVisibility) {
    return null;
  }

  return (
    <div className="player-container" style={{ width: playerWidth }}>
      { titleVisibility && <span className="title">{ currentTrack.title }</span> }
      <TrackNavigation
        audioRef={ audioRef }
        currentTrack={ currentTrack }
        trackNavigationVisibility={ trackNavigationVisibility }
      />
      <div className="controls">
        <TrackTime audioRef={ audioRef } timer={ timer }/>
        <ControlButtons
          audioRef={ audioRef }
          tracks={ tracks }
          currentTrack={ currentTrack }
          setCurrentTrack={ setCurrentTrack }
          isPlaying={ isPlaying }
          setIsPlaying={ setIsPlaying }
          multipleAudioPlayer={ multipleAudioPlayer }
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
