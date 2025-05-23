// import styles from './Input.module.scss';
// import magnifier_Svg from '../../assets/svg/magnifier_Svg.svg';
// import cross_Svg from '../../assets/svg/cross_Svg.svg';
// import { forwardRef, ForwardedRef, useState } from 'react';

// interface InputProps {
//     className?: string;
//     onClick?: () => void;
//     // Убираем ref из пропсов, так как он будет обрабатываться forwardRef
// }

// const Input = forwardRef<HTMLInputElement, InputProps>(
//   ({ className = "", onClick }, ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>) => {
//     const [active, setActive] = useState(true);

//     const clear = () => {
//       // Добавляем реализацию функции clear
//       if (ref && typeof ref === 'object' && ref.current) {
//         ref.current.value = '';
//       }
//       setActive(false);
//     };

//     return (
//       <div onClick={onClick} className={`${styles.containerInput} ${className}`}>
//         <img src={magnifier_Svg} alt="magnifier_Svg" />
//         <input 
//           // ref={ref} 
//           className={styles.containerInput__input} 
//           type="text" 
//         />
//         {active && <img onClick={clear} src={cross_Svg} alt="Clear input" />}
//       </div>
//     );
//   }
// );

// export default Input;