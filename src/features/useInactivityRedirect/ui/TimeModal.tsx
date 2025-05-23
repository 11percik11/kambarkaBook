import React, { useEffect, useState } from "react";
import styles from "./TimeModal.module.scss"; // сделай простые стили
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";

interface IdleModalProps {
  onStay: () => void;
  visable?: boolean;
  timerModal: number;
}

const IdleModal: React.FC<IdleModalProps> = ({
  onStay,
  visable,
  timerModal,
}) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(timerModal / 1000);
  const totalTime = timerModal / 1000; // Общее время в секундах
  const modelActive = useSelector((state: RootState) => state.model.active);
  // Вычисляем процент оставшегося времени
  const progress = (countdown / totalTime) * 100;


  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1 && modelActive) {
          clearInterval(interval);
          navigate("/");
          onStay();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div 
    data-ignore-idle
      onClick={() => onStay()}
      className={`${styles.modalTime} ${visable && styles.modalTime__visable}`}
    >
      <div className={styles.modalTime__container} onClick={(e) => e.stopPropagation()}>
        <div
          className={styles.modalTime__boxTimer}
          style={{ "--progress": `${progress}%` } as React.CSSProperties}
        >
          <div className={styles.modalTime__timer}>{countdown}</div>
        </div>

        <h2 className={styles.modalTime__h2}>Завершение сеанса</h2>
        <div className={styles.modalTime__containerText}>
          <div className={styles.modalTime__message}>
            Из-за отсутствия активности программа скоро вернётся в главное меню
          </div>
          <div className={styles.modalTime__note}>
            Вы можете нажать в любое место экрана, чтобы возобновить работу
          </div>
        </div>
        <div className={styles.modalTime__buttonsBox}>
          <button
            className={`${styles.modalTime__buttonsBox_button} ${styles.modalTime__buttonsBox_button_item1}`}
            onClick={() => onStay()}
          >
            Продолжить
          </button>
          <button
            className={`${styles.modalTime__buttonsBox_button} ${styles.modalTime__buttonsBox_button_item2}`}
            onClick={() => navigate("/")}
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdleModal;
