import styles from './ButtonNavigate.module.scss';
import cross from '../../assets/svg/cross_Svg.svg';
import arrow from '../../assets/svg/arow_Svg.svg';

interface ButtonNavigateProps {
    variant?: "cross" | "arrow";
    className?: string;
    onClick?: () => void;
}

export default function ButtonNavigate({variant = "arrow", className, onClick}: ButtonNavigateProps) {
  return (
    <button onClick={onClick} className={`${styles.button} ${variant == "arrow" ? styles.button__arrow : styles.button__cross} ${className}`}>
        <img src={variant == "arrow" ? arrow : cross} alt="" />
    </button>
  )
}
