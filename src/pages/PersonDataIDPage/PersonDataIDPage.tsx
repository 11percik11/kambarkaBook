import styles from './PersonDataIDPage.module.scss';
import HeaderSearch from '../../widgets/HeaderSearch/HeaderSearch'
import FieldDataID from '../../widgets/FieldDataID/FieldDataID'
import { useLocation } from 'react-router-dom';
import svoPng from "../../shared/assets/foto/fon/svo.png";
import chechnyaPng from "../../shared/assets/foto/fon/chechnya2.png";
import vovPng from "../../shared/assets/foto/fon/vov.png";
import bgAfganPng from "../../shared/assets/foto/fon/bgAfgan.png";
import DatePng from "../../shared/assets/foto/fon/date.png";
import memorialPng from "../../shared/assets/foto/fon/memorial.png";
import siriaPng from "../../shared/assets/foto/fon/siria bg.png";

export default function PersonDataIDPage() {
  const location = useLocation();
  const NumberSectionId = location.state.sectionId;
  const TitlePage = [
    "Дни воинской славы и памятные даты России",
    "Первая Мировая Война",
    "Великая Отечественная Война 1941-1945 г.г.",
    "Военный конфликт на территории Демократической Республики Афганистан",
    "Контртеррористическая операция на территории Северо-Кавказского региона",
    "Специальная Военная Операция",
    "Памятники Камбарского района",
    "Камбарский район в годы ВОВ",
    "Участники иных событий",
  ];

    const backgroundImages = [
      DatePng,
      memorialPng,
      vovPng,
      bgAfganPng,
      chechnyaPng,
      svoPng,
      siriaPng,
    ];
  return (
    <div className={styles.personDataIDPage} style={{
            backgroundImage: `url(${
              backgroundImages[NumberSectionId - 1] || vovPng
            })`,
          }}>
        <HeaderSearch variantHeader="none" >{TitlePage[NumberSectionId - 1]}</HeaderSearch>
        <FieldDataID/>
    </div>
  )
}
