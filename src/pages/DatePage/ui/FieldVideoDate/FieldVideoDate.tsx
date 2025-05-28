import styles from ".//FieldVideoDate.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store/store";
import CastomVideo from "../../../../shared/ui/CastomVideo/CastomVideo";
import SmartText from "../../../../shared/ui/Typograf/Typograf";

export default function FieldVideoDate() {
  const UrlVideo = useSelector((state: RootState) => state.video);
  // console.log(UrlVideo);

const stripHtmlTags = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, "")    // удаляем HTML-теги
    .replace(/&nbsp;/g, " ");   // заменяем &nbsp; на обычный пробел
};

  const cleanText = (UrlVideo.title || "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const cleanDescription = stripHtmlTags(cleanText || "");

  const formatDate = (dateString: string): string => {
    const [day, month] = dateString.split(".").map(Number);

    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];

    if (isNaN(day) || isNaN(month) || month < 1 || month > 12) {
      return dateString;
    }

    return `${day} ${months[month - 1]}`;
  };

  const formattedDate = formatDate(UrlVideo.date);

  return (
    <>
      {UrlVideo.video && (
        <div className={styles.fieldVideoDate}>
            <CastomVideo src={`https://api-kambarka-memory-book.itlabs.top${UrlVideo.video}`} className={styles.fieldVideoDate__video} title={cleanDescription}/>
          <div className={styles.fieldVideoDate__containerInformation}>
            <p className={styles.fieldVideoDate__date}>{formattedDate}</p>
            <SmartText tag="p" className={styles.fieldVideoDate__description}>{cleanDescription}</SmartText>
          </div>
        </div>
      )}
    </>
  );
}
