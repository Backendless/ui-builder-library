import { useEffect, useRef, useState } from 'react';

import { changeTimeFormat } from './utils/time';
import { Player } from './player';

export default function AudioPlayer({ component }) {
  const {
    display,
    audioUrl,
    audioTitle,
    classList,
    multipleAudioPlayer,
    repeatOne,
    autoPlay,
    defaultVolume,
    audioData,
  } = component;
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMute, setIsMute] = useState(false);
  const [timer, setTimer] = useState('00:00');
  const [volume, setVolume] = useState(defaultVolume || 50);
  const audioRef = useRef();
  const tracks = audioData;
  const singleAudio = {
    url  : audioUrl,
    title: audioTitle, 
  };

  const defaultTrack = multipleAudioPlayer && Array.isArray(tracks) ? tracks[0] : singleAudio;
  
  const [currentTrack, setCurrentTrack] = useState(defaultTrack);
  
  useEffect(() => {
    setCurrentTrack(defaultTrack);
  }, [audioTitle, audioUrl, audioData]);
  
  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);
  
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  if (!display) {
    return null;
  }
  
  const onPlaying = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;

    setCurrentTrack({
      ...currentTrack,
      progress: currentTime / duration * 100,
      length  : duration,
    });

    const currentTimeProgress = changeTimeFormat(audioRef.current.currentTime);

    setTimer(currentTimeProgress);
  };

  const playNextTrack = () => {
    const index = tracks.findIndex(track => {
      return track.url === currentTrack.url;
    });

    if (index === tracks.length - 1) {
      stopPlaying();
    } else {
      setCurrentTrack(tracks[index + 1]);
    }
  };

  const stopPlaying = () => {
    setIsPlaying(false);
    audioRef.current.currentTime = 0;
  };

  const onEnded = () => {
    if (multipleAudioPlayer) {
      playNextTrack();
    } else {
      stopPlaying();
    }
  };

  return (
    <div className={ 'bl-customComponent-audio-player ' + classList.join(' ') }>
       <audio
          autoPlay={ isPlaying }
          ref={ audioRef }
          src={ currentTrack.url }
          onTimeUpdate={ onPlaying }
          muted={ isMute }
          preload="auto"
          loop={ repeatOne }
          onEnded={ onEnded }>
        </audio>
        <Player
          component={ component }
          tracks={ tracks }
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
        />
    </div>
  );
}
