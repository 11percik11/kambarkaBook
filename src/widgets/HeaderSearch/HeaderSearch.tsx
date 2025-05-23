import ButtonNavigate from "../../shared/ui/ButtonNavigate/ButtonNavigate";
import styles from "./HeaderSearch.module.scss";
import magnifier_Svg from "../../shared/assets/svg/magnifier_Svg.svg";
import cross_Svg from "../../shared/assets/svg/cross_Svg.svg";
import vector_Svg from "../../shared/assets/svg/vector_Svg.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderSearchProps {
  children: React.ReactNode;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  setVisable?: (value: boolean) => void;
  variantHeader?: "none" | "search" | "link";
  funClearData?: () => void;
}

export default function HeaderSearch({
  children,
  inputRef,
  setVisable,
  variantHeader = "none",
  funClearData,
}: HeaderSearchProps) {
  const [showClear, setShowClear] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
    if (funClearData) {
      funClearData();
    }
  };

  useEffect(() => {
    if (!inputRef?.current) return;

    const handleInputChange = () => {
      setShowClear(!!inputRef.current?.value);
    };
    inputRef.current.addEventListener("input", handleInputChange);
    handleInputChange();

    return () => {
      inputRef.current?.removeEventListener("input", handleInputChange);
    };
  }, [inputRef]);

  const clearInput = () => {
    if (inputRef?.current) {
      inputRef.current.value = "";
      const event = new Event("input", { bubbles: true });
      inputRef.current.dispatchEvent(event);
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles.headerSearch}>
      <ButtonNavigate
        onClick={handleBackClick}
        className={styles.headerSearch__button}
      />
      <h3
        className={`${styles.headerSearch__title} ${
          variantHeader == "none" && styles.headerSearch__titleWidthAuto
        }`}
      >
        {children}
      </h3>
      {variantHeader == "search" && (
        <div
          onClick={() => setVisable?.(true)}
          className={`${styles.containerInput} ${
            isFocused ? styles.containerInput__focused : ""
          }`}
        >
          <img
            className={styles.headerSearch__img}
            src={magnifier_Svg}
            alt="magnifier_Svg"
          />
          <input
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            ref={inputRef}
            className={styles.containerInput__input}
            type="text"
          />
          {showClear && (
            <img
              onClick={clearInput}
              src={cross_Svg}
              alt="Clear input"
              className={styles.clearIcon}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
      )}
      {variantHeader == "link" && (
        <button className={styles.headerSearch__link}>
          <p className={styles.headerSearch__link_text}>Место памяти</p>
          <img src={vector_Svg} alt="" />
        </button>
      )}
    </div>
  );
}
