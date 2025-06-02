import { useState, useRef, useCallback, useEffect } from "react";
import styles from "./KeyBoardLetters.module.scss";
import { keys, keysNumber } from "./model/modele";
import { Icon } from "./ui/Icon/Icon";
import VectorLeft from "../../assets/svg/VectorLeft.svg";
import VectorRight from "../../assets/svg/VectorRight.svg";

interface KeyBoardLettersProps {
  inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  onInputChange?: (value: string) => void;
  onVisable?: () => void;
  clickInput?: () => void;
  className?: string;
  keyBoardNumber?: boolean;
  maxValue?: number;
}

type ShiftMode = "off" | "once" | "lock";

export default function KeyBoardLetters({
  inputRef,
  onInputChange,
  onVisable,
  clickInput,
  className = "",
  keyBoardNumber = false,
  maxValue,
}: KeyBoardLettersProps) {
  const [internalValue, setInternalValue] = useState("");
  const [shiftMode, setShiftMode] = useState<ShiftMode>("off");
  const internalInputRef = useRef<HTMLInputElement>(null);

  const updateCursor = useCallback(() => {
    const targetInput = inputRef?.current || internalInputRef.current;
    if (!targetInput) return;
    clickInput?.();
    return targetInput.selectionStart || 0;
  }, [inputRef]);

  useEffect(() => {
    if (keyBoardNumber) {
      const initial = maxValue && maxValue > 2 ? "2" : "1";
      setInternalValue(initial);

      // Уведомить родителя
      onInputChange?.(initial);

      // Обновить значение в input вручную
      const targetInput = inputRef?.current || internalInputRef.current;
      if (targetInput) {
        targetInput.value = initial;
      }
    }
  }, [maxValue, keyBoardNumber]);

  const handleBox = () => {
    const targetInput = inputRef?.current || internalInputRef.current;
      if (!targetInput) return;
      targetInput.focus();
  }

  const handleKeyPress = useCallback(
    (key: string) => {
      const targetInput = inputRef?.current || internalInputRef.current;
      if (!targetInput) return;

      targetInput.focus();

      let newValue = targetInput.value;
      const startPos = targetInput.selectionStart || 0;
      const endPos = targetInput.selectionEnd || 0;
      let newCursorPos = startPos;

      switch (key) {
        case "backspace":
          if (startPos === endPos && startPos > 0) {
            newValue =
              newValue.slice(0, startPos - 1) + newValue.slice(startPos);
            newCursorPos = startPos - 1;
          } else if (startPos !== endPos) {
            newValue = newValue.slice(0, startPos) + newValue.slice(endPos);
            newCursorPos = startPos;
          }
          break;

        case "Пробел":
          if (newValue == "") break;
          newValue = newValue.slice(0, startPos) + " " + newValue.slice(endPos);
          newCursorPos = startPos + 1;
          break;

        case "Ввод":
          clickInput?.();
          break;

        case "shift":
          setShiftMode((prev) => {
            if (prev === "off") return "once";
            if (prev === "once") return "lock";
            return "off";
          });
          return;

        default:
          const char = shiftMode !== "off" ? key.toUpperCase() : key;
          if (shiftMode == "once"){
            setShiftMode("off");
          }
          newValue =
            newValue.slice(0, startPos) + char + newValue.slice(endPos);
          newCursorPos = startPos + char.length;

          // Если это цифровая клавиатура, ограничим по maxValue
          if (keyBoardNumber) {
            const numericVal = parseInt(newValue) || 1;
            if (numericVal > (maxValue || Infinity)) {
              newValue = String(maxValue);
              newCursorPos = newValue.length;
            }
          }
      }

      targetInput.value = newValue;
      setInternalValue(newValue);

      const event = new Event("input", { bubbles: true });
      targetInput.dispatchEvent(event);

      setTimeout(() => {
        targetInput.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);

      onInputChange?.(newValue);
    },
    [shiftMode, inputRef, onInputChange]
  );

  useEffect(() => {
    clickInput?.();
  }, [internalValue]);

  useEffect(() => {
    const targetInput = inputRef?.current || internalInputRef.current;
    if (!targetInput) return;

    targetInput.addEventListener("click", updateCursor);
    targetInput.addEventListener("keyup", updateCursor);

    return () => {
      targetInput.removeEventListener("click", updateCursor);
      targetInput.removeEventListener("keyup", updateCursor);
    };
  }, [updateCursor, inputRef]);

  const numericValue = parseInt(internalValue) || 1;
  const isAtMin = numericValue <= 1;
  const isAtMax = maxValue !== undefined && numericValue >= maxValue;
  return (
    <div className={`${styles.keyBoardLetters} ${className}`} onClick={onVisable}>
      {!inputRef && (
        <div className={styles.keyBoardLetters__boxInput} onClick={(e) => e.stopPropagation()}>
          <button
            className={`${styles.keyBoardLetters__buttonPagination} ${
              isAtMin && styles.keyBoardLetters__buttonPaginationVisible
            }`}
            onClick={() => {
              // const inputRef = useRef<HTMLInputElement>(null);
              const targetInput = internalInputRef.current;
              if (!targetInput) return;

              const current = parseInt(targetInput.value) || 0;
              const updated = Math.max(current - 1, 1); // 🔒 минимум 1

              if (updated !== current) {
                targetInput.value = String(updated);
                setInternalValue(String(updated));
                onInputChange?.(String(updated));

                const event = new Event("input", { bubbles: true });
                targetInput.dispatchEvent(event);
              }
            }}
          >
            <img src={VectorLeft} alt="" />
          </button>
          <input
            ref={internalInputRef}
            value={internalValue}
            onChange={(e) => {
              let val = parseInt(e.target.value) || 1;

              if (val < 1) val = 1;
              if (maxValue && val > maxValue) val = maxValue;

              const strVal = String(val);
              setInternalValue(strVal);
              onInputChange?.(strVal);
            }}
            onClick={updateCursor}
            onKeyUp={updateCursor}
            className={styles.keyBoardLetters__keyboardInput}
          />
          <button
            className={`${styles.keyBoardLetters__buttonPagination} ${
              isAtMax && styles.keyBoardLetters__buttonPaginationVisible
            }`}
            onClick={() => {
              // const inputRef = useRef<HTMLInputElement>(null);
              const targetInput = internalInputRef.current;
              if (!targetInput) return;

              const current = parseInt(targetInput.value) || 0;
              const updated = Math.min(current + 1, maxValue || Infinity); // 🔒 максимум из props

              if (updated !== current) {
                targetInput.value = String(updated);
                setInternalValue(String(updated));
                onInputChange?.(String(updated));

                const event = new Event("input", { bubbles: true });
                targetInput.dispatchEvent(event);
              }
            }}
          >
            <img src={VectorRight} alt="" />
          </button>
        </div>
      )}

      <div
        onMouseDown={(e) => e.preventDefault()}
        onClick={(e) => {e.stopPropagation(); handleBox()}}
        className={`${styles.keyBoardLetters__container} ${styles.keyBoardLetters__containerNumber}`}
      >
        {!keyBoardNumber ? (
          <>
            {keys.map((item, index) => (
              <button
                key={index}
                className={item.class
                  .split(" ")
                  .map((className) => styles[`keyBoardLetters__${className}`])
                  .join(" ")}
                onClick={() => handleKeyPress(item.valueRUS)}
                onMouseDown={(e) => e.preventDefault()}
              >
                {item.icon === "shift" ? (
                  <Icon
                    name={
                      shiftMode === "lock"
                        ? "glyph2"
                        : shiftMode === "once"
                        ? "glyph"
                        : "shift"
                    }
                  />
                ) : item.icon ? (
                  <Icon name={item.icon} />
                ) : item.valueRUS === "Пробел" || item.valueRUS === "Ввод" ? (
                  item.valueRUS
                ) : shiftMode !== "off" ? (
                  item.valueRUS.toUpperCase()
                ) : (
                  item.valueRUS
                )}
              </button>
            ))}
          </>
        ) : (
          <div className={styles.keyBoardLetters__BoxNumber}>
            {keysNumber.map((item, index) => (
              <button
                key={index}
                className={item.class
                  .split(" ")
                  .map((className) => styles[`keyBoardLetters__${className}`])
                  .join(" ")}
                onClick={() => handleKeyPress(item.valueRUS)}
                onMouseDown={(e) => e.preventDefault()}
              >
                {item.icon === "shift" ? (
                  <Icon
                    name={
                      shiftMode === "lock"
                        ? "glyph2"
                        : shiftMode === "once"
                        ? "glyph"
                        : "shift"
                    }
                  />
                ) : item.icon ? (
                  <Icon name={item.icon} />
                ) : item.valueRUS === "Пробел" || item.valueRUS === "Ввод" ? (
                  item.valueRUS
                ) : shiftMode !== "off" ? (
                  item.valueRUS.toUpperCase()
                ) : (
                  item.valueRUS
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div onClick={onVisable} className={styles.keyBoardLetters__cross}>
        <Icon name="cross_keyboard" />
      </div>
    </div>
  );
}
