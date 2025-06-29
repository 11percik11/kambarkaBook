import { useEffect, useRef, useState } from "react";
import HeaderSearch from "../../widgets/HeaderSearch/HeaderSearch";
import KeyBoardLetters from "../../shared/ui/KeyBoardLetters/KeyBoardLetters";
import FiledData from "../../widgets/FieldData/FiledData";
import styles from "./DataSearchPage.module.scss";
import {
  useGetPeopleQuery,
  useLazyGetPeopleQuery,
} from "../../entities/Hero/api/HeroApi";
import { useDispatch, useSelector } from "react-redux";
import { clearHeroes, setHeroes } from "../../entities/Hero/api/HeroSlice";
import { RootState } from "../../app/store/store";
import { useLocation } from "react-router-dom";
import svoPng from "../../shared/assets/foto/jpg/svo.jpg";
import chechnyaPng from "../../shared/assets/foto/jpg/chechnya2.jpg";
import vovPng from "../../shared/assets/foto/jpg/vov.jpg";
import bgAfganPng from "../../shared/assets/foto/jpg/bgAfgan.jpg";
import DatePng from "../../shared/assets/foto/jpg/date.jpg";
import memorialPng from "../../shared/assets/foto/jpg/memorial.jpg";
import siriaPng from "../../shared/assets/foto/jpg/siria bg.jpg";

import { useAllMemorialQuery } from "../../entities/Memorial/api/MemorialApi";
import { setMemorial } from "../../entities/Memorial/api/MemorialSlice";
import Loader from "../../shared/ui/Loader/Loader";

export default function DataSearch() {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [visableKeyboard, setVisableKeyboard] = useState(false);
  const dataAct = useSelector((state: RootState) => state.hero.items);
  const location = useLocation();
  const NumberSectionId = location.state.sectionId;

  const { data, isLoading } = useGetPeopleQuery({
    sectionId: NumberSectionId,
    name: "",
  });

  const { data: dataMemorial } = useAllMemorialQuery({
    sectionId: NumberSectionId,
  });

  const backgroundImages = [
    DatePng,
    memorialPng,
    vovPng,
    bgAfganPng,
    chechnyaPng,
    svoPng,
    siriaPng,
  ];
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

  const [triggerGetPeople] = useLazyGetPeopleQuery();
  const HandleClickInput = () => {
    localStorage.removeItem("scrollTop");
    triggerGetPeople({
      sectionId: NumberSectionId,
      name: inputRef.current?.value,
    })
      .unwrap()
      .then((data) => {
        dispatch(setHeroes(data));
      })
      .catch((error) => {
        console.error("Ошибка при фильтраци:", error);
      });
  };

  useEffect(() => {
    if (dataAct.length == 0 && data) {
      dispatch(setHeroes(data));
    }
  }, [data]);

  useEffect(() => {
    if (dataAct.length == 0 && dataMemorial) {
      dispatch(setMemorial(dataMemorial));
    }
  }, [dataMemorial]);

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div
      className={styles.dataSearchPage}
      style={{
        backgroundImage: `url(${
          backgroundImages[NumberSectionId - 1] || vovPng
        })`,
      }}
    >
      <HeaderSearch
        onClick={() => {localStorage.removeItem("searchInput"); localStorage.removeItem("scrollTop");}}
        funClearData={() => dispatch(clearHeroes())}
        variantHeader={
          NumberSectionId == 7 || NumberSectionId == 8 ? "link" : "search"
        }
        clickInput={HandleClickInput}
        setVisable={setVisableKeyboard}
        inputRef={inputRef}
      >
        {TitlePage[NumberSectionId - 1]}
      </HeaderSearch>
      <FiledData />
      {visableKeyboard && (
        <KeyBoardLetters
          clickInput={() => HandleClickInput()}
          onVisable={() => setVisableKeyboard(false)}
          inputRef={inputRef}
        />
      )}
    </div>
  );
}
