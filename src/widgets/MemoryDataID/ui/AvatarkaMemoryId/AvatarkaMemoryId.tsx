import { MemorialImages } from "../../../../entities/Memorial/model/types";
import styles from "./AvatarkaMemoryId.module.scss";
// import none_heroImg from "../../../../shared/assets/foto/none_heroImg.png";
import horseIcon from "../../../../shared/assets/foto/jpg/horse.png";
import { useState, useRef } from "react";
import arrow_img_left_Svg from "../../../../shared/assets/svg/arrow_img_left_Svg.svg";
import arrow_img_right_Svg from "../../../../shared/assets/svg/arrow_img_right_Svg.svg";

interface AvatarkaMemoryIdProps {
  className?: string;
  urlImgAvatarka?: MemorialImages[];
  title?: string;
}

export default function AvatarkaMemoryId({
  className = "",
  urlImgAvatarka,
  title,
}: AvatarkaMemoryIdProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const startX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const swipeThreshold = 50;

  const hasMultipleImages = (urlImgAvatarka?.length || 0) > 1;

  // Общая функция для обработки конца свайпа/драг
  const handleSwipeEnd = (endX: number | null) => {
    if (startX.current === null || endX === null) return;
    const diff = startX.current - endX;

    if (diff > swipeThreshold) {
      // свайп влево
      if (currentImageIndex < (urlImgAvatarka?.length || 0) - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    } else if (diff < -swipeThreshold) {
      // свайп вправо
      if (currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      }
    }
    startX.current = null;
    isDragging.current = false;
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!hasMultipleImages) return;
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const endX = e.changedTouches[0].clientX;
    handleSwipeEnd(endX);
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!hasMultipleImages) return;
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleSwipeEnd(e.clientX);
  };

  // Чтобы не листать при случайном движении мыши без зажатия
  const handleMouseLeave = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleSwipeEnd(e.clientX);
    }
  };

  return (
    <div className={`${styles.avatarkaDataID} ${className}`}>
      <div
        className={styles.avatarkaDataID__boxImg}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: hasMultipleImages ? "grab" : "default" }}
      >
        {!!urlImgAvatarka?.length && (
          <div
            className={styles.avatarkaDataID__photoBlurBackground}
            style={{
              backgroundImage:
                `url(https://api-kambarka-memory-book.itlabs.top${urlImgAvatarka[currentImageIndex]?.image})` ||
                horseIcon,
            }}
          ></div>
        )}

        <img
          src={
            urlImgAvatarka?.length
              ? `https://api-kambarka-memory-book.itlabs.top${urlImgAvatarka[currentImageIndex]?.image}`
              : horseIcon
          }
          draggable={false}
          className={styles.avatarkaDataID__image}
          alt=""
        />
        {currentImageIndex >= 1 && (
          <div
            onClick={() =>
              currentImageIndex >= 1 &&
              setCurrentImageIndex(currentImageIndex - 1)
            }
            className={styles.avatarkaDataID__boxImg_arrowLeft}
          >
            <img src={arrow_img_left_Svg} alt="" />
          </div>
        )}
        {!!urlImgAvatarka?.length &&
          currentImageIndex !== urlImgAvatarka.length - 1 && (
            <div
              onClick={() =>
                currentImageIndex !== urlImgAvatarka.length - 1 &&
                setCurrentImageIndex(currentImageIndex + 1)
              }
              className={styles.avatarkaDataID__boxImg_arrowRight}
            >
              <img src={arrow_img_right_Svg} alt="" />
            </div>
          )}
        {hasMultipleImages && (
          <div className={styles.avatarkaDataID__dotsContainer}>
            {urlImgAvatarka?.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`${styles.avatarkaDataID__dot} ${
                  index === currentImageIndex
                    ? styles.avatarkaDataID__activeDot
                    : ""
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles.avatarkaDataID__text}>
        <p>{title}</p>
      </div>
    </div>
  );
}
