import { useEffect, useRef, useState } from 'react';

import { useTimeUpdate } from './helpers/use-time-update';
import { Player } from './player';

const { cn } = BackendlessUI.CSSUtils;

export default function AudioPlayer({ component, elRef }) {
  const { style, display, audioUrl, audioTitle, classList, repeat, autoPlay, defaultVolume } = component;

  const audioRef = useRef();

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMute, setIsMute] = useState(false);
  const [volume, setVolume] = useState(defaultVolume || 50);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const audioUrls = Array.isArray(audioUrl) ? audioUrl : null;
  const audioTitles = Array.isArray(audioTitle) ? audioTitle : null;
  const defaultTrack = {
    url  : audioUrls ? audioUrl[currentTrackIndex] : audioUrl,
    title: audioTitles ? audioTitle[currentTrackIndex] : audioTitle,
  };

  const [currentTrack, setCurrentTrack] = useState(defaultTrack);

  const { timer, onPlaying } = useTimeUpdate(audioRef, currentTrack, setCurrentTrack);

  useEffect(() => {
    setCurrentTrack(defaultTrack);
  }, [audioTitle, audioUrl, currentTrackIndex]);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    audioRef.current[isPlaying ? 'play' : 'pause']();
  }, [isPlaying]);

  const stopPlaying = () => {
    setIsPlaying(false);
    audioRef.current.currentTime = 0;
  };

  const onEnded = () => {
    if (audioUrls && audioUrls[currentTrackIndex + 1]) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      stopPlaying();
    }
  };

  component.playAudio = () => setIsPlaying(true);
  component.stopAudio = () => stopPlaying();
  component.replaceAudio = (audioUrl, audioTitle) => {
    setCurrentTrack({ url: audioUrl, title: audioTitle });
    setIsPlaying(true);
  };

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-audio-player', classList) } style={ style }>
      <audio
        autoPlay={ isPlaying }
        ref={ audioRef }
        src={ currentTrack.url }
        onTimeUpdate={ onPlaying }
        muted={ isMute }
        preload="auto"
        loop={ repeat }
        onEnded={ onEnded }>
      </audio>

      <Player
        component={ component }
        audioRef={ audioRef }
        currentTrack={ currentTrack }
        setCurrentTrack={ setCurrentTrack }
        isPlaying={ isPlaying }
        setIsPlaying={ setIsPlaying }
        isMute={ isMute }
        setIsMute={ setIsMute }
        timer={ timer }
        volume={ volume }
        setVolume={ setVolume }
        index={ currentTrackIndex }
        setIndex={ setCurrentTrackIndex }
        audioUrls={ audioUrls }
      />
    </div>
  );
}
