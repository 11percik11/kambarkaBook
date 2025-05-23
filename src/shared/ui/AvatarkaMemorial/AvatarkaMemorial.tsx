import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AvatarkaMemorial.module.scss";
import none_heroImg from '../../assets/foto/none_heroImg.png';
import { MemorialImage } from "../../../entities/Memorial/model/types";

interface AvatarkaProps {
  item?: MemorialImage | any;
  className?: string;
}

export default function AvatarkaMemorial({ item, className }: AvatarkaProps) {
  const navigate = useNavigate();
    const location = useLocation();
    const sectionId = location.state.sectionId;

  
  return (
    <div
      onClick={() => navigate(`/memory/${item?.id}`, { state: { sectionId } })}
      className={`${styles.avatarka} ${className}`}
    >
      <img
        className={styles.avatarka__img}
        src={item?.image ? `https://api-kambarka-memory-book.itlabs.top${item?.image}` : none_heroImg}
        alt=""
      />
      <div className={styles.avatarka__text}>
        <p className={styles.avatarka__name}>{item?.title}</p>
      </div>
    </div>
  );
}