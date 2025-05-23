import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './KeyBoardLetters.module.scss';
import { keys } from './model/modele';
import { Icon } from './ui/Icon/Icon';

interface KeyBoardLettersProps {
  inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  onInputChange?: (value: string) => void;
  onVisable?: () => void;
  clickInput?: () => void;
  className?: string;
}

type ShiftMode = 'off' | 'once' | 'lock';

export default function KeyBoardLetters({ 
  inputRef, 
  onInputChange,
  onVisable,
  clickInput,
  className = '' 
}: KeyBoardLettersProps) {
  const [internalValue, setInternalValue] = useState('');
  const [shiftMode, setShiftMode] = useState<ShiftMode>('off');
  const internalInputRef = useRef<HTMLInputElement>(null);

  const updateCursor = useCallback(() => {
    const targetInput = inputRef?.current || internalInputRef.current;
    if (!targetInput) return;
    clickInput?.();
    return targetInput.selectionStart || 0;
  }, [inputRef]);

  const handleKeyPress = useCallback((key: string) => {
    const targetInput = inputRef?.current || internalInputRef.current;
    if (!targetInput) return;

    targetInput.focus();

    let newValue = targetInput.value;
    const startPos = targetInput.selectionStart || 0;
    const endPos = targetInput.selectionEnd || 0;
    let newCursorPos = startPos;

    switch (key) {
      case 'backspace':
        if (startPos === endPos && startPos > 0) {
          newValue = newValue.slice(0, startPos - 1) + newValue.slice(startPos);
          newCursorPos = startPos - 1;
        } else if (startPos !== endPos) {
          newValue = newValue.slice(0, startPos) + newValue.slice(endPos);
          newCursorPos = startPos;
        }
        break;

      case 'Пробел':
        newValue = newValue.slice(0, startPos) + ' ' + newValue.slice(endPos);
        newCursorPos = startPos + 1;
        break;

      case 'Ввод':
        clickInput?.();
        break;

      case 'shift':
        setShiftMode(prev => {
          if (prev === 'off') return 'once';
          if (prev === 'once') return 'lock';
          return 'off';
        });
        return;

      default:
        const char = shiftMode !== 'off' ? key.toUpperCase() : key;
        newValue = newValue.slice(0, startPos) + char + newValue.slice(endPos);
        newCursorPos = startPos + char.length;

        if (shiftMode === 'once') {
          setShiftMode('off');
        }
        break;
    }

    targetInput.value = newValue;
    setInternalValue(newValue);

    const event = new Event('input', { bubbles: true });
    targetInput.dispatchEvent(event);

    setTimeout(() => {
      targetInput.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);

    onInputChange?.(newValue);
  }, [shiftMode, inputRef, onInputChange]);

  useEffect(() => {
    clickInput?.();
  }, [internalValue]);

  useEffect(() => {
    const targetInput = inputRef?.current || internalInputRef.current;
    if (!targetInput) return;

    targetInput.addEventListener('click', updateCursor);
    targetInput.addEventListener('keyup', updateCursor);

    return () => {
      targetInput.removeEventListener('click', updateCursor);
      targetInput.removeEventListener('keyup', updateCursor);
    };
  }, [updateCursor, inputRef]);

  return (
    <div className={`${styles.keyBoardLetters} ${className}`}>
      {!inputRef && (
        <input
          ref={internalInputRef}
          value={internalValue}
          onChange={(e) => {
            setInternalValue(e.target.value);
            onInputChange?.(e.target.value);
          }}
          onClick={updateCursor}
          onKeyUp={updateCursor}
          className={styles.keyboardInput}
        />
      )}

      <div className={styles.keyBoardLetters__container}>
        {keys.map((item, index) => (
          <button
            key={index}
            className={item.class.split(' ')
              .map(className => styles[`keyBoardLetters__${className}`])
              .join(' ')}
            onClick={() => handleKeyPress(item.valueRUS)}
            onMouseDown={(e) => e.preventDefault()}
          >
            {item.icon === 'shift' ? (
              <Icon
                name={
                  shiftMode === 'lock'
                    ? 'glyph2'
                    : shiftMode === 'once'
                    ? 'glyph'
                    : 'shift'
                }
              />
            ) : item.icon ? (
              <Icon name={item.icon} />
            ) : item.valueRUS === 'Пробел' || item.valueRUS === 'Ввод' ? (
              item.valueRUS
            ) : (
              shiftMode !== 'off'
                ? item.valueRUS.toUpperCase()
                : item.valueRUS
            )}
          </button>
        ))}
      </div>

      <div onClick={onVisable} className={styles.keyBoardLetters__cross}>
        <Icon name="cross_keyboard" />
      </div>
    </div>
  );
}
