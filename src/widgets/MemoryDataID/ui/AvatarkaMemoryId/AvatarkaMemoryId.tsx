import { MemorialImages } from "../../../../entities/Memorial/model/types";
import styles from "./AvatarkaMemoryId.module.scss";
import none_heroImg from "../../../../shared/assets/foto/none_heroImg.png";
import { useState } from "react";
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
      
      const hasMultipleImages = (urlImgAvatarka?.length || 0) > 1;
  return (
    <div className={`${styles.avatarkaDataID} ${className}`}>
      <div className={styles.avatarkaDataID__boxImg}>
        {urlImgAvatarka?.length && (
          <div
            className={styles.avatarkaDataID__photoBlurBackground}
            style={{
              backgroundImage:
                `url(https://api-kambarka-memory-book.itlabs.top${urlImgAvatarka[currentImageIndex]?.image})` ||
                none_heroImg,
            }}
          ></div>
        )}

        <img
          src={
            urlImgAvatarka?.length
              ? `https://api-kambarka-memory-book.itlabs.top${urlImgAvatarka[currentImageIndex]?.image}`
              : none_heroImg
          }
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
        {urlImgAvatarka?.length &&
          currentImageIndex != urlImgAvatarka.length - 1 && (
            <div
              onClick={() =>
                currentImageIndex != urlImgAvatarka.length - 1 &&
                setCurrentImageIndex(currentImageIndex + 1)
              }
              className={styles.avatarkaDataID__boxImg_arrowRirht}
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
