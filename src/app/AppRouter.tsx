import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import DataSearch from "../pages/DataSearchPage/DataSearchPage";
import PersonDataIDPage from "../pages/PersonDataIDPage/PersonDataIDPage";
import DatePage from "../pages/DatePage/DatePage";
import IdleModal from "../features/useInactivityRedirect/ui/TimeModal";
import { useIdle } from "../features/useInactivityRedirect/IdleContext";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import MemorialIDPage from "../pages/MemorialIDPage/MemorialIDPage";

export const AppRouter = () => {
  const { showModal, resetTimer, modalTimeoutDate } = useIdle(); // 5 минут + 30 сек. модалка
  const isMainPage = location.pathname === "/";
  const modelActive = useSelector((state: RootState) => state.model.active);
  
  return (
    <>
      {!isMainPage && showModal && modelActive && <IdleModal onStay={resetTimer} timerModal={modalTimeoutDate} />}

      <Routes>
        <Route index element={<MainPage />} />
        <Route path="search" element={<DataSearch />} />
        <Route path="search/:id" element={<PersonDataIDPage />} />
        <Route path="memory/:id" element={<MemorialIDPage />} />
        <Route path="date" element={<DatePage />} />
      </Routes>
    </>
  );
};
