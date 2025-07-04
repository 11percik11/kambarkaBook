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
      <div className={styles.cardField__boxYellow}>
      </div>

      <div className={styles.cardField__boxRed}>
          <SmartText tag='p' className={styles.cardField__text}>{children}</SmartText>
      </div>

      <div className={styles.cardField__boxСircleYellow}>
      </div>   
    </div>
  )
}
