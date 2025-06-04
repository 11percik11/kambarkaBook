import { useDispatch, useSelector } from "react-redux";
import Avatarka from "../../shared/ui/Avatarka/Avatarka";
import styles from "./FieldData.module.scss";
import { RootState } from "../../app/store/store";
import { useEffect, useRef, useState } from "react";
import { useLazyGetPeopleQuery } from "../../entities/Hero/api/HeroApi";
import { addHeroes } from "../../entities/Hero/api/HeroSlice";
import { useIdle } from "../../features/useInactivityRedirect/IdleContext";
import { useLocation } from "react-router-dom";
import { MemorialResponseApi } from "../../entities/Memorial/model/types";
import { useLazyAllMemorialQuery } from "../../entities/Memorial/api/MemorialApi";
import { addMemorial } from "../../entities/Memorial/api/MemorialSlice";
import AvatarkaMemorial from "../../shared/ui/AvatarkaMemorial/AvatarkaMemorial";
import { ApiResponse } from "../../entities/Hero/model/types";

export default function FiledData() {
  const { resetTimer } = useIdle();

  const location = useLocation();
  const NumberSectionId = location.state.sectionId;

  const [currentPage, setCurrentPage] = useState(2);
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();
  const [fetchPeople] = useLazyGetPeopleQuery();
  const [fetchMemorial] = useLazyAllMemorialQuery();
  const DataHeroAll = useSelector((state: RootState) => state.hero);
  const DataMemorialAll = useSelector((state: RootState) => state.memorial);
  let ALL_DATA: MemorialResponseApi | ApiResponse = DataHeroAll;

  if (NumberSectionId == 7 || NumberSectionId == 8) {
    ALL_DATA = DataMemorialAll;
  }

  const containerRef = useRef<HTMLDivElement>(null);

  // Восстановление прокрученного состояния при загрузке страницы
  useEffect(() => {
    const savedScrollTop = localStorage.getItem("scrollTop");
    if (savedScrollTop && containerRef.current) {
      containerRef.current.scrollTop = parseInt(savedScrollTop, 10);
    }
  }, []);

  useEffect(() => {
    if (NumberSectionId == 7 || NumberSectionId == 8) {
      if (
        fetching &&
        currentPage <= DataMemorialAll.pagination.totalPages &&
        DataMemorialAll.items.length != DataMemorialAll.pagination.totalItems
      ) {
        let page = currentPage;
        if (
          DataMemorialAll.pagination.totalItems - DataMemorialAll.items.length <
          24
        ) {
          page = DataMemorialAll.pagination.totalPages;
        }
        fetchMemorial({ sectionId: NumberSectionId, page: page })
          .then((response) => {
            if (response.data) {
              dispatch(addMemorial(response.data));
              setCurrentPage((prev) => prev + 1);
            }
          })
          .finally(() => setFetching(false));
        }
      } else {
        if (
          fetching &&
          currentPage <= DataHeroAll.pagination.totalPages &&
          DataHeroAll.items.length != DataHeroAll.pagination.totalItems
        ) {
          let page = currentPage;
          if (DataHeroAll.pagination.totalItems - DataHeroAll.items.length < 24) {
            page = DataHeroAll.pagination.totalPages;
          }
          fetchPeople({ sectionId: NumberSectionId, page: page })
          .then((response) => {
            if (response.data) {
              dispatch(addHeroes(response.data));
              setCurrentPage((prev) => prev + 1);
            }
          })
          .finally(() => setFetching(false));
        }
        
        console.log('gggggggggggg');
        
      }
      console.log('kkkkkkkk');
  }, [fetching]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    resetTimer();
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    localStorage.setItem("scrollTop", scrollTop.toString());
    // console.log('wer');
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 400;
    if (isNearBottom) {
      // console.log('rrrrr');
      
      setFetching(true);
      console.log(fetching);
      
    }
  };

  return (
    <div className={styles.fieldData}>
      <div
        className={styles.fieldData__container}
        onScroll={handleScroll}
        ref={containerRef}
      >
        {ALL_DATA?.items.length ? (
          ALL_DATA.items.map((item, index) =>
            NumberSectionId === 7 || NumberSectionId === 8 ? (
              <AvatarkaMemorial item={item} key={index} />
            ) : (
              <Avatarka item={item} key={index} />
            )
          )
        ) : (
          <div className={styles.fieldData__textDataZero}>
            Ничего не найдено
          </div>
        )}
      </div>
    </div>
  );
}
