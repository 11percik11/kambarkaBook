import { useNavigate } from 'react-router-dom';
import ButtonNavigate from '../../../../../../shared/ui/ButtonNavigate/ButtonNavigate';
import styles from './HeroHeaderInformation.module.scss';

interface HeroHeaderInformationProps {
    children?: React.ReactNode;
    className?: string;
} 

export default function HeroHeaderInformation({children, className}: HeroHeaderInformationProps) {
  const navigate = useNavigate();
  return (
    <div className={`${styles.heroHeaderInformation} ${className}`}>
        <ButtonNavigate onClick={() => navigate('/')} className={styles.heroHeaderInformation__button}/>
        <h3 className={styles.heroHeaderInformation__title}>{children}</h3>
    </div>
  )
}
