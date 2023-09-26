import { ControlButton } from './control-button';

export function Controls(props) {
  const { audioRef, isPlaying, setIsPlaying, index, setIndex, audioUrls } = props;

  const skipBack = () => {
    setIndex((index - 1 + audioUrls.length) % audioUrls.length);
    setIsPlaying(true);
  };

  const skipNext = () => {
    setIndex((index + 1) % audioUrls.length);
    setIsPlaying(true);
  };

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const rewind = () => {
    audioRef.current.currentTime -= 10;
  };

  const forward = () => {
    audioRef.current.currentTime += 10;
  };

  return (
    <div className="control-buttons">
      { audioUrls && <ControlButton buttonName="skip_previous" onClick={ skipBack }/> }
      <ControlButton buttonName="fast_rewind" onClick={ rewind }/>
      <ControlButton buttonName={ isPlaying ? 'pause' : 'play_arrow' } onClick={ togglePlaying }/>
      <ControlButton buttonName="fast_forward" onClick={ forward }/>
      { audioUrls && <ControlButton buttonName="skip_next" onClick={ skipNext }/> }
    </div>
  );
}
