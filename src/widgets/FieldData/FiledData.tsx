import { useDispatch, useSelector } from 'react-redux';
import Avatarka from '../../shared/ui/Avatarka/Avatarka';
import styles from './FieldData.module.scss';
import { RootState } from '../../app/store/store';
import { useEffect, useState } from 'react';
import { useLazyGetPeopleQuery } from '../../entities/Hero/api/HeroApi';
import { addHeroes } from '../../entities/Hero/api/HeroSlice';
import { useIdle } from '../../features/useInactivityRedirect/IdleContext';
import { useLocation } from 'react-router-dom';
import { MemorialImage, MemorialResponseApi } from '../../entities/Memorial/model/types';
import { useLazyAllMemorialQuery } from '../../entities/Memorial/api/MemorialApi';
import { addMemorial } from '../../entities/Memorial/api/MemorialSlice';
import AvatarkaMemorial from '../../shared/ui/AvatarkaMemorial/AvatarkaMemorial';
import { ApiResponse } from '../../entities/Hero/model/types';

export default function FiledData() {
  const {resetTimer} = useIdle();

  const location = useLocation();
  const NumberSectionId = location.state.sectionId;


console.log(NumberSectionId);


  
  const [currentPage, setCurrentPage] = useState(2);
    const [fetching, setFetching] = useState(false);
    const dispatch = useDispatch();
    const [fetchPeople] = useLazyGetPeopleQuery();
    const [fetchMemorial] = useLazyAllMemorialQuery();
    const DataHeroAll = useSelector((state: RootState) => state.hero);
    const DataMemorialAll = useSelector((state: RootState) => state.memorial);
    let ALL_DATA: MemorialResponseApi | ApiResponse = DataHeroAll;
    
    if (NumberSectionId == 7 || NumberSectionId == 8 ) {
      ALL_DATA = DataMemorialAll
    }
    console.log(NumberSectionId);
    
    console.log(ALL_DATA);
  
    useEffect(() => {

      if (NumberSectionId == 7 || NumberSectionId == 8) {
        if (fetching && currentPage <= DataMemorialAll.pagination.totalPages) {
          fetchMemorial({sectionId: NumberSectionId, page: currentPage })
            .then((response) => {
              if (response.data) {
                dispatch(addMemorial(response.data));
                setCurrentPage((prev) => prev + 1);
              }
            })
            .finally(() => setFetching(false));
        }
      }else {
        if (fetching && currentPage <= DataHeroAll.pagination.totalPages) {
          fetchPeople({sectionId: NumberSectionId, page: currentPage })
          .then((response) => {
            if (response.data) {
              dispatch(addHeroes(response.data));
              setCurrentPage((prev) => prev + 1);
            }
          })
          .finally(() => setFetching(false));
        }
      }
      }, [fetching]);
  
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      resetTimer();
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 400;
      if (isNearBottom) {
        setFetching(true);
      }
    };
  
  return (
    <div className={styles.fieldData}>
  <div className={styles.fieldData__container} onScroll={handleScroll}>
    {ALL_DATA?.items.length ? (
      ALL_DATA.items.map((item, index) => (
        NumberSectionId === 7 || NumberSectionId === 8 ? (
            <AvatarkaMemorial item={item} key={index} />
        ) : (
          <Avatarka item={item} key={index} />
        )
      ))
    ) : (
      <div className={styles.fieldData__textDataZero}>Ничего не найдено</div>
    )}
  </div>
</div>
  )
}




// import { useDispatch, useSelector } from 'react-redux';
// import Avatarka from '../../shared/ui/Avatarka/Avatarka';
// import styles from './FieldData.module.scss';
// import { RootState } from '../../app/store/store';
// import { useEffect, useState } from 'react';
// import { useLazyGetPeopleQuery } from '../../entities/Hero/api/HeroApi';
// import { addHeroes } from '../../entities/Hero/api/HeroSlice';
// import { useIdle } from '../../features/useInactivityRedirect/IdleContext';

// export default function FiledData() {
//   const {resetTimer} = useIdle();

  




  
//   const [currentPage, setCurrentPage] = useState(2);
//     const [fetching, setFetching] = useState(false);
//     const dispatch = useDispatch();
//     const SectionNumber = useSelector((state: RootState) => state.section.sectionNumber)
//     const [fetchPeople] = useLazyGetPeopleQuery();
//     const DataHeroAll = useSelector((state: RootState) => state.hero);  
  
//     useEffect(() => {
//       if (fetching && currentPage <= DataHeroAll.pagination.totalPages) {
//           fetchPeople({sectionId: SectionNumber, page: currentPage })
//             .then((response) => {
//               if (response.data) {
//                 dispatch(addHeroes(response.data));
//                 setCurrentPage((prev) => prev + 1);
//               }
//             })
//             .finally(() => setFetching(false));
//         }
//     }, [fetching]);
  
//     const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
//       resetTimer();
//       const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
//       const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 400;
//       if (isNearBottom) {
//         setFetching(true);
//       }
//     };

//   return (
//     <div className={styles.fieldData}>
//         <div className={styles.fieldData__container} onScroll={handleScroll}>
//         {DataHeroAll?.items.length ? DataHeroAll.items.map((item, index) => (
//             <Avatarka item={item} key={index}></Avatarka>
//         )) : <div className={styles.fieldData__textDataZero}>Ничего не найдено</div>}
//         </div>
//     </div>
//   )
// }
