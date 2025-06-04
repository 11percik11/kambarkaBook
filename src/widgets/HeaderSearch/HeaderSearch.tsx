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
  clickInput?: () => void;
  storageKey?: string; // New prop for localStorage key
  onClick?: () => void;
}

declare global {
  interface MyGlobalObject {
    PostMessage: (input: string) => void;
  }

  var CefSharp: MyGlobalObject;
}

export default function HeaderSearch({
  children,
  inputRef,
  setVisable,
  variantHeader = "none",
  funClearData,
  clickInput,
  storageKey = "searchInput", // Default key for localStorage
  onClick,
}: HeaderSearchProps) {
  const [showClear, setShowClear] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
    onClick?.();
    if (funClearData) {
      funClearData();
    }
  };
  // Load saved value from localStorage on component mount
  useEffect(() => {
    if (!inputRef?.current || !storageKey) return;
    
    const savedValue = localStorage.getItem(storageKey);
    if (savedValue && inputRef.current) {
      inputRef.current.value = savedValue;
      setShowClear(savedValue.length > 0);
    }
  }, [inputRef, storageKey]);

  useEffect(() => {
    if (!inputRef?.current || !storageKey) return;

    const handleInputChange = () => {
      const value = inputRef.current?.value || '';
      setShowClear(value.length > 0);
      
      // Save to localStorage
      if (value) {
        localStorage.setItem(storageKey, value);
      } else {
        localStorage.removeItem(storageKey);
      }
    };
    
    inputRef.current.addEventListener("input", handleInputChange);
    handleInputChange();

    return () => {
      inputRef.current?.removeEventListener("input", handleInputChange);
    };
  }, [inputRef, storageKey]);

  const clearInput = () => {
    if (inputRef?.current) {
      inputRef.current.value = "";
      const event = new Event("input", { bubbles: true });
      inputRef.current.dispatchEvent(event);
      inputRef.current.focus();
      
      // Clear from localStorage
      if (storageKey) {
        localStorage.removeItem(storageKey);
      }
    }

    clickInput?.();
  };

  const lupaClick = () => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }    
  }



  function toSite(str: string) {
    let obj = {
        url: str,
        home: false, keyboard: false,
        back: false,
    }
    CefSharp.PostMessage(JSON.stringify(obj))
}

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
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {setVisable?.(true); lupaClick()}}
          className={`${styles.containerInput} ${
            isFocused ? styles.containerInput__focused : ""
          }`}
        >
          <img
            className={styles.headerSearch__img}
            src={magnifier_Svg}
            alt="magnifier_Svg"
            onClick={lupaClick}
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
          <a className={styles.headerSearch__link_text} onClick={() => toSite('https://местопамяти.рф')}>Место памяти</a>
          <img src={vector_Svg} alt="" />
        </button>
      )}
    </div>
  );
}