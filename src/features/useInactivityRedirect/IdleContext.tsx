import React, { createContext, useContext } from "react";
import { useIdleRedirect } from "./UseInactivityRedirect";
import { useGetWaitQuery } from "../../entities/Popup/api/Wait_mod";

interface IdleContextProps {
  resetTimer: () => void;
  showModal: boolean;
  modalTimeoutDate: number;
}

const IdleContext = createContext<IdleContextProps | null>(null);

export const IdleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {data} = useGetWaitQuery();
  const { resetTimer, showModal, modalTimeoutDate } = useIdleRedirect((data?.notificationSeconds || 60) * 1000, (data?.sleepModeSeconds || 30) * 1000);

  return (
    <IdleContext.Provider value={{ resetTimer, showModal, modalTimeoutDate }}>
      {children}
    </IdleContext.Provider>
  );
};

export const useIdle = (): IdleContextProps => {
  const context = useContext(IdleContext);
  if (!context) {
    throw new Error("useIdle must be used within an IdleProvider");
  }
  return context;
};
