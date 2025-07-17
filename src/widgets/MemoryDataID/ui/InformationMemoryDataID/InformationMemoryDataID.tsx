import styles from "./InformationMemoryDataID.module.scss";
import { Free, Memorial } from "../../../../entities/Memorial/model/types";
import SmartText from "../../../../shared/ui/Typograf/Typograf";
import { useLocation } from "react-router-dom";

interface InformationMemoryDataIDProps {
  data: Memorial | Free;
}

export default function InformationMemoryDataID({
  data,
}: InformationMemoryDataIDProps) {
  const location = useLocation();
  const NumberSectionId = location.state.sectionId;
  const isMemorial = (data: Memorial | Free): data is Memorial => {
    return "name" in data;
  };
  return (
    <div className={styles.informationDataID}>
      <div className={styles.InformationMemoryDataID__containerInfromation}>
        {NumberSectionId == 7 && isMemorial(data) ? (
          <>
            {data?.title && (
              <div
                className={`${styles.InformationMemoryDataID__field} ${styles.InformationMemoryDataID__fieldTitle}`}
              >
                <div className={styles.InformationMemoryDataID__field_titel}>
                  Наименование
                </div>
                <p
                  className={
                    styles.InformationMemoryDataID__field_textInformation
                  }
                >
                  {data?.name}
                </p>
              </div>
            )}
            {data?.place && (
              <>
                <hr className={styles.InformationMemoryDataID__hr} />
                <div className={styles.InformationMemoryDataID__field}>
                  <div className={styles.InformationMemoryDataID__field_titel}>
                    Местонахождение
                  </div>
                  <p
                    className={
                      styles.InformationMemoryDataID__field_textInformation
                    }
                  >
                    {data?.place}
                  </p>
                </div>
              </>
            )}

            {data?.setupDate && (
              <>
                <hr className={styles.InformationMemoryDataID__hr} />

                <div className={styles.InformationMemoryDataID__field}>
                  <div className={styles.InformationMemoryDataID__field_titel}>
                    Год установки
                  </div>
                  <p
                    className={
                      styles.InformationMemoryDataID__field_textInformation
                    }
                  >
                    {data?.setupDate} год
                  </p>
                </div>
              </>
            )}
            {data?.updateDate && (
              <>
                <hr className={styles.InformationMemoryDataID__hr} />
                <div className={styles.InformationMemoryDataID__field}>
                  <div className={styles.InformationMemoryDataID__field_titel}>
                    Реконструкция
                  </div>
                  <p
                    className={
                      styles.InformationMemoryDataID__field_textInformation
                    }
                  >
                    {data?.updateDate} год
                  </p>
                </div>
              </>
            )}

            <div>
              <hr
                className={`${styles.InformationMemoryDataID__hr} ${styles.InformationMemoryDataID__hrMargin}`}
              />
              {data?.description && (
                <>
                  <div
                    className={`${styles.InformationMemoryDataID__fieldColumns} ${styles.InformationMemoryDataID__fieldColumns_margin}`}
                  >
                    <div
                      className={styles.InformationMemoryDataID__field_titel}
                    >
                      Описание
                    </div>
                    <p
                      className={
                        styles.InformationMemoryDataID__field_textInformation
                      }
                    >
                      <SmartText>{data?.description}</SmartText>
                    </p>
                  </div>
                </>
              )}
              {data?.history && (
                <>
                  <div className={styles.InformationMemoryDataID__fieldColumns}>
                    <div
                      className={styles.InformationMemoryDataID__field_titel}
                    >
                      История
                    </div>
                    <p
                      className={
                        styles.InformationMemoryDataID__field_textInformation
                      }
                    >
                      <SmartText>{data?.history}</SmartText>
                    </p>
                  </div>
                  //{" "}
                </>
              )}
            </div>
          </>
        ) : (
          <div className={`${styles.InformationMemoryDataID__fieldTitle}`}>
            <h1 className={styles.freeTitle}>{data.title}</h1>
            <div>
              {(data as Free).freeInfo.map((info) => (
                <>
                  <div className={styles.free_infoTitle} key={info.id}>
                    {info.title}
                  </div>
                  <div className={styles.free_infoDescription} key={info.id}>
                    {info.description}
                  </div>{" "}
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
