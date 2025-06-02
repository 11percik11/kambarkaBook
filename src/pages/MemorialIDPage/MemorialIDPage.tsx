import styles from './MemorialIDPage.module.scss';
import { useLocation } from "react-router-dom";
import HeaderSearch from "../../widgets/HeaderSearch/HeaderSearch";
import MemoryDataID from '../../widgets/MemoryDataID/MemoryDataID';

import svoPng from "../../shared/assets/foto/jpg/svo.jpg";
import chechnyaPng from "../../shared/assets/foto/jpg/chechnya2.jpg";
import vovPng from "../../shared/assets/foto/jpg/vov.jpg";
import bgAfganPng from "../../shared/assets/foto/jpg/bgAfgan.jpg";
import DatePng from "../../shared/assets/foto/jpg/date.jpg";
import memorialPng from "../../shared/assets/foto/jpg/memorial.jpg";
import siriaPng from "../../shared/assets/foto/jpg/siria bg.jpg";

export default function MemorialIDPage() {
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
    <div className={styles.memorialIDPage} style={{
                backgroundImage: `url(${
                  backgroundImages[NumberSectionId - 1] || vovPng
                })`,
              }}>
      <HeaderSearch variantHeader="none" >{TitlePage[NumberSectionId - 1]}</HeaderSearch>
       <MemoryDataID/>       
    </div>
  )
}
