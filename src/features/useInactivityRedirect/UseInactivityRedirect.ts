import { useEffect, useRef, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store/store";

export function useIdleRedirect(timeout: number = 3 * 1000, modalTimeout: number = 5 * 1000) {
  const navigate = useNavigate();
  const timerRef = useRef<number | null>(null);
  const modalTimer = useRef<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const modalTimeoutDate = modalTimeout;
  const modelActive = useSelector((state: RootState) => state.model.active);
  
  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (modalTimer.current) clearTimeout(modalTimer.current);
  };

  const resetTimer = useCallback((e?: Event) => {
    if (!modelActive) return;
    if (e && e.target instanceof HTMLElement && e.target.closest('[data-ignore-idle]')) {
    return;
    }
    
    clearTimers();
    setShowModal(false);
    timerRef.current = setTimeout(() => {
      setShowModal(true);
      modalTimer.current = setTimeout(() => {
        if (modelActive) {
          navigate("/");
        }
      }, modalTimeout);
    }, timeout);
  }, [navigate, timeout, modalTimeout, modelActive]);

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"];


    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer(); // запустить при монтировании

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimers();
    };
  }, [resetTimer]);

  return {resetTimer, showModal, modalTimeoutDate };
}