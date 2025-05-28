import { useState, useEffect } from "react";
import styles from "./ContainerDate.module.scss";
import FieldDate from "../FieldDate/FieldDate";
import {
  useLazyGetDateQuery,
  useLazyGetDayQuery,
} from "../../../../entities/Date/api/DateApi";
import Loader from "../../../../shared/ui/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addDate, clearDate } from "../../../../entities/Date/api/DateSlice";
import { RootState } from "../../../../app/store/store";
import { claerVideo, setVideo } from "../../../../entities/Date/api/VideoSlice";
import { useIdle } from "../../../../features/useInactivityRedirect/IdleContext";

export default function ContainerDate() {
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const dispatch = useDispatch();
  const [numberPage, setNumberPage] = useState(0);
  const [activeId, setActiveId] = useState<number | null>(0);
  const { resetTimer } = useIdle();

  const [fetchDate, { isLoading: isLoadingDate }] = useLazyGetDateQuery();
  const [fetchDay, { isLoading: isLoadingDay }] = useLazyGetDayQuery();

  const DataDateAll = useSelector((state: RootState) => state.date);

  useEffect(() => {
    if (fetching && currentPage <= DataDateAll.pagination.totalPages) {
      if (numberPage == 0) {
        fetchDate({ page: currentPage })
          .then((response) => {
            if (response.data) {
              dispatch(addDate(response.data));
              dispatch(setVideo({ video: response.data.items[0].video, title: response.data.items[0].description, date: response.data.items[0].date}));
              setCurrentPage((prev) => prev + 1);
              setActiveId(0);
            }
          })
          .finally(() => setFetching(false));
      } else {
        fetchDay({ page: currentPage })
          .then((response) => {
            if (response.data) {
              dispatch(addDate(response.data));
              dispatch(setVideo({ video: response.data.items[0].video, title: response.data.items[0].description, date: response.data.items[0].date}));
              setCurrentPage((prev) => prev + 1);
              setActiveId(0);
            }
          })
          .finally(() => setFetching(false));
      }
    }
  }, [fetching, numberPage]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    resetTimer();
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 1;
    if (isNearBottom) {
      setFetching(true);
    }
  };

  const DateOrDay = (numberPage: number) => {
    setNumberPage(numberPage);
    setActiveId(null);
    setCurrentPage(1);
    dispatch(clearDate());
    setFetching(true);
    dispatch(claerVideo());
  };

  const handleFieldClick = (
    index: number,
    video: string,
    title: string,
    date: string
  ) => {
    // console.log(index);
    
    setActiveId(index);
    dispatch(setVideo({ video, title, date }));
  };

  // if (isLoadingDate || isLoadingDay)
  //   return (
  //     <div>
  //       <Loader />
  //     </div>
  //   );

  return (
    <div className={styles.containerDate}>
      <div className={styles.containerDate__titelBox}>
        <button
          onClick={() => DateOrDay(0)}
          className={`${styles.containerDate__boxButton_button} ${
            numberPage === 0 && styles.containerDate__boxButton_buttonActive
          }`}
        >
          Памятные даты
        </button>
        <button
          onClick={() => DateOrDay(1)}
          className={`${styles.containerDate__boxButton_button} ${
            numberPage === 1 && styles.containerDate__boxButton_buttonActive
          }`}
        >
          Дни воинской славы
        </button>
      </div>
      <div className={styles.containerDate__listDate}>
        <div className={styles.containerDate__field} onScroll={handleScroll}>
          {DataDateAll && DataDateAll.items.length > 0 ? (
            DataDateAll.items.map((item, index) => (
              <FieldDate
                key={index}
                textInformation={item}
                onClick={() =>
                  handleFieldClick(
                    index,
                    item.video,
                    item.description,
                    item.date
                  )
                }
                active={activeId === index}
              />
            ))
          ) : !isLoadingDate && !isLoadingDay && !fetching ? (
            <div className={styles.containerDate__noDate}>Нет данных</div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}
