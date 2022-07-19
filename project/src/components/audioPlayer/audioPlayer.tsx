import { useState, useEffect, useRef } from 'react';

type AudioPlayerProps = {
  src: string;
  isPlaying: boolean;
  onPlayButtonClick: () => void;
}

function AudioPlayer({src, isPlaying, onPlayButtonClick}: AudioPlayerProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current === null) {
      return;
    }

    audioRef.current.addEventListener('loadeddata', () => setIsLoading(false));

    if (isPlaying) {
      audioRef.current.play();
      return;
    }

    audioRef.current.pause();
  }, [isPlaying]);

  return (
    <>
      <button className={`track__button track__button--${isPlaying ? 'pause' : 'play'}`} type="button" disabled={isLoading}
        onClick={onPlayButtonClick}
      />
      <div className="track__status">
        <audio src={src} ref={audioRef}></audio>
      </div>
    </>
  );
}

export default AudioPlayer;
