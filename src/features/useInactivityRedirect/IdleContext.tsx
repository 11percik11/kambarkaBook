import React, { createContext, useContext } from "react";
import { useIdleRedirect } from "./UseInactivityRedirect";

interface IdleContextProps {
  resetTimer: () => void;
  showModal: boolean;
  modalTimeoutDate: number;
}

const IdleContext = createContext<IdleContextProps | null>(null);

export const IdleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { resetTimer, showModal, modalTimeoutDate } = useIdleRedirect(60 * 1000, 30 * 1000);

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
