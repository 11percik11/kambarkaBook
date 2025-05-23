import { useRef, useState, useEffect } from "react";
import styles from "./CastomVideo.module.scss";

import start_video_Svg from "../../assets/svg/Play.svg";
import pausB_Svg from "../../assets/svg/Pause.svg";
import Volume from "../../assets/svg/Volume Loud.svg";
import Full_Screen from "../../assets/svg/Full Screen.svg";
import CrossVideo from "../../assets/svg/CrossVideo.svg";
import Quit_Full from "../../assets/svg/Quit Full Screen.svg";
import Sound_mid from "../../assets/svg/Sound_mid.svg";
import Sound_off from "../../assets/svg/Sound_off.svg";
import { useDispatch } from "react-redux";
import { modelActive } from "../../../entities/Date/api/ModelSlice";
import IconVideoStart from "../../assets/svg/IconVideoStart.svg";

type CastomVideoProps = {
  src: string;
  poster?: string;
  title?: string; // 🔥 передаём заголовок
  className?: string;
  IconVideo?: boolean;
};

export default function CastomVideo({
  src,
  poster,
  title,
  className,
  IconVideo = false,
}: CastomVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false); // 🔥 отслеживаем fullscreen
  const [volume, setVolume] = useState(1);
  const [isEnded, setIsEnded] = useState(false);
  const dispatch = useDispatch();
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<number | null>(null);

  const showControlsTemporarily = () => {
    setShowControls(true);

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    const video = videoRef.current;
  if (video?.paused === false && isFullscreen) {
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  } // 3 секунды
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
        showControlsTemporarily();
      } else {
        video.pause();
        setIsPlaying(false);
        setShowControls(true);
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
      dispatch(modelActive({ active: true }));
    } else {
      container.requestFullscreen();
      dispatch(modelActive({ active: false }));
    }
  };

  const exitFullscreen = () => {
    document.exitFullscreen();
    dispatch(modelActive({ active: true }));
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);

    const handleEnded = () => {
      setIsPlaying(false);
      setIsEnded(true);
      setShowControls(true); 
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  // 🔥 Следим за изменением fullscreen-состояния
  useEffect(() => {
    const fullscreenChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);
      if (isFs) {
        showControlsTemporarily();
      } else {
        setShowControls(true); // всегда показываем в обычном режиме
      }
    };

    document.addEventListener("fullscreenchange", fullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", fullscreenChange);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    video.currentTime = newTime;
    setCurrentTime(newTime);

    console.log(isEnded);
    if (isEnded) {
      video.play();
      setIsPlaying(true);
      setIsEnded(false); // сброс, т.к. мы перезапустили
    }
  };

  // Клик по громкости
  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.min(Math.max(clickX / rect.width, 0), 1);

    video.volume = newVolume;
    video.muted = newVolume === 0;

    setVolume(newVolume); // 🔥 обновляем состояние
    setIsMuted(video.muted);
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return Sound_off;
    if (volume > 0 && volume <= 0.5) return Sound_mid;
    return Volume;
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  

  return (
    <div
      className={`${styles.castomVideo} ${className} ${
        isFullscreen ? styles.fullscreen : ""
      }`}
      ref={containerRef}
    >
      {isFullscreen && (
        <div className={`${styles.fullscreenHeader} ${
            showControls ? styles.visible : styles.hidden
          }`}>
          <span className={styles.castomVideo__title}>{title}</span>
          <button onClick={exitFullscreen} className={styles.closeBtn}>
            <img src={CrossVideo} alt="" />
          </button>
        </div>
      )}

      <video
        ref={videoRef}
        className={styles.videoPlayer}
        src={src}
        poster={poster}
        controls={false}
        onClick={() => {
          if (isFullscreen) {
            showControlsTemporarily();
          } else {
            togglePlay(); // в обычном режиме просто play/pause
          }
        }}
      />

      {IconVideo && !isFullscreen && (
        <div onClick={toggleFullscreen} className={styles.iconVideoStart}>
          <img src={IconVideoStart} alt="" />
        </div>
      )}

      {(!IconVideo || isFullscreen) && (
        <div
          className={`${styles.controlsWrapper} ${
            showControls ? styles.visible : styles.hidden
          }`}
        >
          <div className={styles.controls}>
            <div className={styles.volumeContainer}>
              <div onClick={toggleMute}>
                <img src={getVolumeIcon()} alt="Volume Icon" />
              </div>
              <div className={styles.volumeBar} onClick={handleVolumeClick}>
                <div
                  className={styles.volumeLevel}
                  style={{
                    width: isMuted ? "0%" : `${volume * 100}%`,
                  }}
                />
              </div>
            </div>
            <span className={styles.time}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <div className={styles.btn2}>
            <div
              className={styles.castomVideo__play_pause}
              onClick={togglePlay}
            >
              <img
                src={isPlaying ? pausB_Svg : start_video_Svg}
                alt="Play/Pause"
              />
            </div>
            <div className={styles.progressBar} onClick={handleProgressClick}>
              <div
                className={styles.progress}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div onClick={toggleFullscreen}>
              {isFullscreen ? (
                <img src={Quit_Full} alt="QuitFullscreen" />
              ) : (
                <img src={Full_Screen} alt="Fullscreen" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
