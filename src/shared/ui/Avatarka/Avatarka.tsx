import { useLocation, useNavigate } from "react-router-dom";
import { Person } from "../../../entities/Hero/model/types";
import styles from "./Avatarka.module.scss";
import none_heroImg from '../../assets/foto/none_heroImg.png';

interface AvatarkaProps {
  item?: Person | any;
  className?: string;
}

export default function Avatarka({ item, className }: AvatarkaProps) {
  const navigate = useNavigate();
    const location = useLocation();
  const sectionId = location.state.sectionId;
  
  return (
    <div
      onClick={() => navigate(`/search/${item?.id}`, { state: { sectionId } })}
      className={`${styles.avatarka} ${className}`}
    >
      <img
        className={styles.avatarka__img}
        src={item?.image ? `https://api-kambarka-memory-book.itlabs.top${item?.image}` : none_heroImg}
        alt=""
      />
      <div className={styles.avatarka__text}>
        <p className={styles.avatarka__name}>{item?.surname}</p>
        <p className={styles.avatarka__patronymicsurname}>
          {item?.name} {item?.patronymic}
        </p>
      </div>
    </div>
  );
}
