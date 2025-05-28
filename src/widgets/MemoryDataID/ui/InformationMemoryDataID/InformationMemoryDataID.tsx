import styles from './InformationMemoryDataID.module.scss';
import { Memorial } from '../../../../entities/Memorial/model/types';
import SmartText from '../../../../shared/ui/Typograf/Typograf';

interface InformationMemoryDataIDProps {
    data: Memorial;
}

export default function InformationMemoryDataID({data}:InformationMemoryDataIDProps) {
  return (
    <div className={styles.informationDataID}>
        <div className={styles.InformationMemoryDataID__containerInfromation}>
            {data?.title && (
              <div className={styles.InformationMemoryDataID__field}>
                <div className={styles.InformationMemoryDataID__field_titel}>
                  Наименование
                </div>
                <p className={styles.InformationMemoryDataID__field_textInformation}>
                  {data?.title}
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
                    className={styles.InformationMemoryDataID__field_textInformation}
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
                    className={styles.InformationMemoryDataID__field_textInformation}
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
                    className={styles.InformationMemoryDataID__field_textInformation}
                  >
                    {data?.updateDate} год
                  </p>
                </div>
              </>
            )}
            {data?.description && (
              <>
                <hr className={styles.InformationMemoryDataID__hr} />
                <div className={`${styles.InformationMemoryDataID__fieldColumns} ${styles.InformationMemoryDataID__fieldColumns_margin}`}>
                  <div className={styles.InformationMemoryDataID__field_titel}>
                    Описание
                  </div>
                  <p
                    className={styles.InformationMemoryDataID__field_textInformation}
                  >
                    <SmartText>{data?.description}</SmartText>
                  </p>
                </div>
              </>
            )}
            {data?.history && (
              <>
                <div className={styles.InformationMemoryDataID__fieldColumns}>
                  <div className={styles.InformationMemoryDataID__field_titel}>
                    История
                  </div>
                  <p
                    className={styles.InformationMemoryDataID__field_textInformation}
                  >
                    <SmartText>{data?.history}</SmartText>
                  </p>
                </div>
              </>
            )}
          </div>
    </div>
  )
}
