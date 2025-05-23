import { useDispatch } from "react-redux";
import HeaderSearch from "../../widgets/HeaderSearch/HeaderSearch";
import styles from "./DatePage.module.scss";
import ContainerDate from "./ui/ContainerDate/ContainerDate";
import FieldVideoDate from "./ui/FieldVideoDate/FieldVideoDate";
import { clearDate } from "../../entities/Date/api/DateSlice";

export default function DatePage() {
  const dispatch = useDispatch(); 
  return (
    <div className={styles.datePage}>
      <HeaderSearch variantHeader="none" funClearData={() => dispatch(clearDate())}>
        Дни воинской славы и памятные даты России
      </HeaderSearch>
      <div className={styles.datePage__container}>
        <ContainerDate />
        <FieldVideoDate />
      </div>
    </div>
  );
}
