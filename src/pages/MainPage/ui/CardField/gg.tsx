import SmartText from '../../../../shared/ui/Typograf/Typograf';
import styles from './CardField.module.scss';

interface CardFieldProps {
    imgUrl: string;
    children: string;
    className?: string;
    onClick?: () => void;
}

export default function CardField({imgUrl, children, className = "", onClick}: CardFieldProps) {
  return (
    <div onClick={onClick} className={`${styles.cardField} ${className}`}>
      <div className={styles.cardField__containerImg}>
        <img className={styles.cardField__img} src={imgUrl} alt="" />
      </div>
      {/* <p className={styles.cardField__text}><SmartText tag='p' className={styles.cardField__text}>{children}</SmartText></p> */}
      <SmartText tag='p' className={styles.cardField__text}>{children}</SmartText>
        {/* <p className={styles.cardField__text}>{children}</p> */}
    </div>
  )
}
