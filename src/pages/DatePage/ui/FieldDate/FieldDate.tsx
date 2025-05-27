import SmartText from "../../../../shared/ui/Typograf/Typograf";
import styles from "./FieldDate.module.scss";

interface FieldDateProps {
  onClick?: () => void;
  className?: string;
  active?: Boolean;
  textInformation: {
    date: string;
    description: string;
  };
}

export default function FieldDate({
  onClick,
  className,
  active = false,
  textInformation,
}: FieldDateProps) {
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
  const formattedDate = formatDate(textInformation.date);

const stripHtmlTags = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, "")    // удаляем HTML-теги
    .replace(/&nbsp;/g, " ");   // заменяем &nbsp; на обычный пробел
};

  const cleanDescription = stripHtmlTags(textInformation.description);
  return (
    <div
      onClick={onClick}
      className={`${styles.fieldDate} ${className} ${
        active && styles.fieldDate__active
      }`}
    >
      <div className={styles.fieldDate__date}>{formattedDate}</div>
      {/* <div className={styles.fieldDate__description}>{cleanDescription}</div> */}
      <SmartText className={styles.fieldDate__description}>{cleanDescription}</SmartText>
    </div>
  );
}
