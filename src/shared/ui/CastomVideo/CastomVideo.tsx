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
import SmartText from "../Typograf/Typograf";

type CastomVideoProps = {
  src: string;
  poster?: string;
  title?: string; // 🔥 передаём заголовок
  className?: string;
  IconVideo?: boolean;
  clickIcon?: boolean;
  setFunVideoTriger?: (item: boolean) => void;
};

export default function CastomVideo({
  src,
  poster,
  title,
  className,
  IconVideo = false,
  clickIcon = false,
  setFunVideoTriger,
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

  useEffect(() => {
    if (clickIcon) {
      toggleFullscreen();
    }
  }, [clickIcon]);

  const showControlsTemporarily = () => {
    setShowControls(true);

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    const video = videoRef.current;
    if (video?.paused === false && isFullscreen) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 4000);
    } // 4 секунды
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
        showControlsTemporarily();
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
      setFunVideoTriger?.(false);
    } else {
      container.requestFullscreen();
      dispatch(modelActive({ active: false }));
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let lastUpdateTime = 0;
    const updateInterval = 100; // Обновлять состояние не чаще чем раз в 100мс

    const handleTimeUpdate = (timestamp: any) => {
      if (!lastUpdateTime || timestamp - lastUpdateTime >= updateInterval) {
        setCurrentTime(video.currentTime);
        lastUpdateTime = timestamp;
      }
      requestAnimationFrame(handleTimeUpdate);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      // Запускаем плавное обновление времени после загрузки метаданных
      requestAnimationFrame(handleTimeUpdate);
    };

    const handleEnded = () => {
      // cancelAnimationFrame(animationFrameId);
      setIsPlaying(false);
      setIsEnded(true);
      setShowControls(true);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      // cancelAnimationFrame(animationFrameId);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Следим за изменением fullscreen-состояния
  useEffect(() => {
    const fullscreenChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);

      setShowControls(true);

      if (!isFs) {
        const video = videoRef.current;
        if (video && !video.paused) {
          video.pause();
          setIsPlaying(false);
        }

        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
      }

      if (isFs) {
        showControlsTemporarily();
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
    showControlsTemporarily();

    // console.log(isEnded);
    if (isEnded) {
      // video.play();
      // setIsPlaying(true);
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

    showControlsTemporarily();
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
        <div
          className={`${styles.fullscreenHeader} ${
            showControls ? styles.visible : styles.hidden
          }`}
        >
          <SmartText className={styles.castomVideo__title} tag="span">{title}</SmartText>
          <button onClick={toggleFullscreen} className={styles.closeBtn}>
            <img src={CrossVideo} alt="" />
          </button>
        </div>
      )}

      <video
        ref={videoRef}
        className={`${styles.videoPlayer} ${
          IconVideo && !isFullscreen && styles.videoPlayerFit
        }`}
        src={src}
        poster={poster}
        controls={false}
        onClick={() => {
          if (isFullscreen) {
            showControlsTemporarily();
          }
          togglePlay();
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

              <div
                className={styles.volumeBarContainer}
                onClick={handleVolumeClick}
              >
                <div className={styles.volumeBar}>
                  <div
                    className={styles.volumeLevel}
                    style={{
                      width: isMuted ? "0%" : `${volume * 100}%`,
                    }}
                  />
                </div>
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
            <div
              className={styles.progressBarBox}
              onClick={handleProgressClick}
            >
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
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
