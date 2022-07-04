export function ControlButtons(props) {
  const {
    audioRef,
    tracks,
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    multipleAudioPlayer,
  } = props;

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const rewind = () => {
    audioRef.current.currentTime -= 10;
  };

  const forward = () => {
    audioRef.current.currentTime += 10;
  };

  const getCurrentTrackIndex = () => {
    return tracks.findIndex(track => {
      return track.url === currentTrack.url;
    });
  };

  const skipBack = () => {
    const index = getCurrentTrackIndex();
    const newTrack = tracks[index - 1] || tracks[tracks.length - 1];

    setCurrentTrack(newTrack);
    setIsPlaying(true);
  };

  const skipNext = () => {
    const index = getCurrentTrackIndex();
    const newTrack = tracks[index + 1] || tracks[0];

    setCurrentTrack(newTrack);
    setIsPlaying(true);
  };

  const styles = {
    display: multipleAudioPlayer ? 'inline-block' : 'none',
  };

  return (
    <div className="control-buttons">
      <button
        className="skip-previous-button material-icons-round"
        style={ styles }
        onClick={ skipBack }
        aria-hidden="true">
        skip_previous
      </button>
      <button
        className="rewind-button material-icons-round"
        onClick={ rewind }
        aria-hidden="true">
        fast_rewind
      </button>
      <button className="play-pause-button material-icons-round" onClick={ togglePlaying }>
        { isPlaying ? 'pause' : 'play_arrow' }
      </button>
      <button
        className="forward-button material-icons-round"
        onClick={ forward }
        aria-hidden="true">
        fast_forward
      </button>
      <button
        className="skip-next-button material-icons-round"
        style={ styles }
        onClick={ skipNext }
        aria-hidden="true">
        skip_next
      </button>
    </div>
  );
}
