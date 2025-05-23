import { useState } from "react";
import { Hero } from "../../../../entities/Hero/model/types";
import medal_noto from "../../../../shared/assets/foto/medal (2).png";
import CastomVideo from "../../../../shared/ui/CastomVideo/CastomVideo";
import styles from "./InformationDataID.module.scss";
import Cross from "../../../../shared/assets/svg/CrossVideo.svg";
import FileText from "../../../../shared/assets/svg/File Text.svg";
import PdfViewer from "../PdfViewer/PdfViewer";
import SmartText from "../../../../shared/ui/Typograf/Typograf";

interface InformationDataIDProps {
  data?: Hero;
}

export default function InformationDataID({ data }: InformationDataIDProps) {
  const [numberPage, setNumberPage] = useState(0);
  const [showModelImg, setShowModelImg] = useState(false);
  const [showModelFile, setShowModelFile] = useState(false);
  const [imgModel, setImgModel] = useState("");
  const [fileModel, setFileModel] = useState("");

  const hadleShowImg = (imgModel: string) => {
    setImgModel(imgModel);
    setShowModelImg(true);
  };

  const hadleShowFile = (fileModel: string) => {
    setFileModel(fileModel);
    setShowModelFile(true);
  };

  return (
    <div className={styles.informationDataID}>
      <div className={styles.informationDataID__boxButton}>
        <button
          onClick={() => setNumberPage(0)}
          className={`${styles.informationDataID__boxButton_button} ${
            numberPage == 0 && styles.informationDataID__boxButton_buttonActive
          }`}
        >
          Основная информация
        </button>
        {data?.description && (
          <button
            onClick={() => setNumberPage(1)}
            className={`${styles.informationDataID__boxButton_button} ${
              numberPage == 1 &&
              styles.informationDataID__boxButton_buttonActive
            }`}
          >
            Биография
          </button>
        )}
        {data?.peopleMedia.length && (
          <button
            onClick={() => setNumberPage(2)}
            className={`${styles.informationDataID__boxButton_button} ${
              numberPage == 2 &&
              styles.informationDataID__boxButton_buttonActive
            }`}
          >
            Дополнительно
          </button>
        )}
      </div>
      <div className={styles.informationDataID__containerInfromation}>
        {numberPage == 0 && (
          <div className={styles.informationDataID__containerInfromation_box}>
            {data?.birthDate && (
              <div className={styles.informationDataID__field}>
                <div className={styles.informationDataID__field_titel}>
                  Дата рождения
                </div>
                <p className={styles.informationDataID__field_textInformation}>
                  {data?.birthDate}
                </p>
              </div>
            )}
            {data?.birthPlace && (
              <>
                <hr className={styles.informationDataID__hr} />
                <div className={styles.informationDataID__field}>
                  <div className={styles.informationDataID__field_titel}>
                    Место рождения
                  </div>
                  <p
                    className={styles.informationDataID__field_textInformation}
                  >
                    {data?.birthPlace}
                  </p>
                </div>
              </>
            )}
            {false && (
              <>
                <hr className={styles.informationDataID__hr} />
                <div className={styles.informationDataID__field}>
                  <div className={styles.informationDataID__field_titel}>
                    Место учебы
                  </div>
                  <p
                    className={styles.informationDataID__field_textInformation}
                  >
                    С 1992 по1994 гг. учился в Екатеринбургском суворовском
                    военном училище. С 1 августа 1994 по 1999 гг. учился в
                    Санкт-Петербургском высшем общевойсковом краснознаменном
                    военном училище
                  </p>
                </div>
              </>
            )}

            {data?.invocationPlace && (
              <>
                <hr className={styles.informationDataID__hr} />

                <div className={styles.informationDataID__field}>
                  <div className={styles.informationDataID__field_titel}>
                    Место призыва, военкомат
                  </div>
                  <p
                    className={styles.informationDataID__field_textInformation}
                  >
                    {data?.invocationPlace}
                  </p>
                </div>
              </>
            )}
            {data?.invocationDate && (
              <>
                <hr className={styles.informationDataID__hr} />
                <div className={styles.informationDataID__field}>
                  <div className={styles.informationDataID__field_titel}>
                    Дата призыва
                  </div>
                  <p
                    className={styles.informationDataID__field_textInformation}
                  >
                    {data?.invocationDate}
                  </p>
                </div>
              </>
            )}
            {data?.militaryRank && (
              <>
                <hr className={styles.informationDataID__hr} />
                <div className={styles.informationDataID__field}>
                  <div className={styles.informationDataID__field_titel}>
                    Воинское звание
                  </div>
                  <p
                    className={styles.informationDataID__field_textInformation}
                  >
                    {data?.militaryRank}
                  </p>
                </div>
              </>
            )}
            {data?.armyUnit && (
              <>
                <hr className={styles.informationDataID__hr} />
                <div className={styles.informationDataID__field}>
                  <div className={styles.informationDataID__field_titel}>
                    Воинская часть
                  </div>
                  <p
                    className={styles.informationDataID__field_textInformation}
                  >
                    {data?.armyUnit}
                  </p>
                </div>
              </>
            )}
            {data?.deathDate && (
              <>
                <hr className={styles.informationDataID__hr} />
                <div className={styles.informationDataID__field}>
                  <div className={styles.informationDataID__field_titel}>
                    Дата смерти
                  </div>
                  <p
                    className={styles.informationDataID__field_textInformation}
                  >
                    {data?.deathDate}
                  </p>
                </div>
              </>
            )}
            {data?.burialPlace && (
              <>
                <hr className={styles.informationDataID__hr} />
                <div className={styles.informationDataID__field}>
                  <div className={styles.informationDataID__field_titel}>
                    Место захоронения
                  </div>
                  <p
                    className={styles.informationDataID__field_textInformation}
                  >
                    {data?.burialPlace}
                  </p>
                </div>
                <hr className={styles.informationDataID__hr} />
              </>
            )}
            <div className={styles.informationDataID_awardsBox}>
              <div className={styles.informationDataID_awardsBox_title}>
                Награды
              </div>
              {data?.awards.length ? (
                <div className={styles.informationDataID__awards}>
                  {data.awards.map((award) => (
                    <div className={styles.informationDataID__awards_medal}>

                      <div className={styles.informationDataID__awards_BoximgMedal}>
                      <img
                        className={styles.informationDataID__awards_imgMedal}
                        src={
                          award.image
                          ? `https://api-kambarka-memory-book.itlabs.top${award.image}`
                          : medal_noto
                        }
                        alt=""
                        />
                      </div>
                      <div
                        className={styles.informationDataID__awards_titleMedal}
                      >
                        {award.title}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.informationDataID__awards_noneAwards}>
                  Нет данных
                </div>
              )}
            </div>
          </div>
        )}
        {numberPage == 1 && (
          <div className={styles.informationDataID__biography}>
            <SmartText>{data?.description}</SmartText>
          </div>
        )}
        {numberPage == 2 && (
          <div className={styles.informationDataID__aditionally}>
            {data?.peopleMedia.map((mediaFile) => {
              const mediaUrl = `https://api-kambarka-memory-book.itlabs.top${mediaFile.media}`;
              const extension = mediaUrl.split(".").pop()?.toLowerCase();

              const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(
                extension || ""
              );
              const isVideo = ["mp4", "webm", "ogg"].includes(extension || "");

              const isPdf = extension === "pdf";

              return (
                <div
                  className={styles.informationDataID__aditionally_container}
                >
                  {isPdf && (
                    <img
                      onClick={() => hadleShowFile(mediaUrl)}
                      src={FileText}
                      alt=""
                    />
                    // <iframe
                    //   className={styles.informationDataID__aditionally_pdf}
                    //   src={mediaUrl}
                    //   width="100%"
                    //   height="500px"
                    //   style={{ border: "none", borderRadius: "8px" }}
                    // />
                  )}
                  {isImage && (
                    <img
                      onClick={() => hadleShowImg(mediaUrl)}
                      className={styles.informationDataID__aditionally_img}
                      src={mediaUrl}
                      alt=""
                    />
                  )}
                  {isVideo && (
                    <CastomVideo
                      IconVideo={true}
                      className={styles.informationDataID__aditionally_video}
                      title={extension}
                      src={mediaUrl}
                    />
                  )}
                  {!isImage && !isVideo && !isPdf && (
                    <p>Неизвестный формат файла: {extension}</p>
                  )}
                  <div className={styles.informationDataID__aditionally_title}>
                    {mediaFile.title}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showModelImg && (
        <div className={styles.showModelImg}>
          <div className={styles.showModelImg__containerImg}>
            <img className={styles.showModelImg__image} src={imgModel} alt="" />
          </div>
          <div
            onClick={() => setShowModelImg(false)}
            className={styles.showModelImg__cross}
          >
            <img src={Cross} alt="" />
          </div>
        </div>
      )}
      {showModelFile && (
        <div className={styles.showModelImg}>
          {/* <iframe
            className={styles.informationDataID__aditionally_pdf}
            src={fileModel}
            width="100%"
            height="500px"
            style={{ border: "none", borderRadius: "8px" }}
          /> */}
          <div className={styles.showModelImg__containerImg}>
            <PdfViewer url={fileModel} key={fileModel} />
          </div>
          <div
            onClick={() => setShowModelFile(false)}
            className={styles.showModelImg__cross}
          >
            <img src={Cross} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}
