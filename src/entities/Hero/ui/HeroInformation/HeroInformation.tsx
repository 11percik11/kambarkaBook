import styles from './HeroInformation.module.scss';
import HeroHeaderInformation from './ui/HeroHeaderInformation/HeroHeaderInformation';

export default function HeroInformation() {
  return (
    <div className={styles.heroInformation}>
        <HeroHeaderInformation>Военный конфликт на территории Демократической Республики Афганистан</HeroHeaderInformation>
    </div>
  )
}
