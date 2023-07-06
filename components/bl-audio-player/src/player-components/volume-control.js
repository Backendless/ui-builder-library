import { useRef } from 'react';

export function VolumeControl(props) {
  const { isMute, setIsMute, volume, setVolume } = props;
  const volumeRef = useRef();

  const toggleMute = () => {
    setIsMute(!isMute);
  };

  const changeVolume = e => {
    setVolume(e.currentTarget.value);
  };

  const styles = {
    backgroundSize: `${ volume }% 100%`,
  };

  return (
    <div className="volume-control">
      <div className="mute" onClick={ toggleMute }>
        <i className="material-icons-round" aria-hidden="true">
          { isMute ? 'volume_off' : 'volume_up' }
        </i>
      </div>
      <input
        style={ styles }
        ref={ volumeRef }
        value={ volume }
        onChange={ changeVolume }
        type="range"
        className="volume-control-input"
        id="volume"
        name="volume"
        min="0"
        max="100"
        step="1"
      />
    </div>
  );
}
