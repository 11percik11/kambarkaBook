import styles from "./MainPage.module.scss";
import star_Svg from "../../shared/assets/svg/star_Svg.svg";
import flag_Svg from "../../shared/assets/svg/flag_Svg.svg";
import link_Svg from "../../shared/assets/svg/link_Svg.svg";
import CardField from "./ui/CardField/CardField";
import { useNavigate } from "react-router-dom";
import { useGetSectionQuery } from "../../entities/Section/api/SectionApi";
import { useLazyGetPeopleQuery } from "../../entities/Hero/api/HeroApi";
import { useDispatch } from "react-redux";
import { setHeroes } from "../../entities/Hero/api/HeroSlice";
import Loader from "../../shared/ui/Loader/Loader";
import { useLazyAllMemorialQuery } from "../../entities/Memorial/api/MemorialApi";
import { setMemorial } from "../../entities/Memorial/api/MemorialSlice";

export default function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSectionQuery();
  const [triggerGetPeople] = useLazyGetPeopleQuery();
  const [triggerAllMemorial] = useLazyAllMemorialQuery();
  const HandleClickInput = (sectionId: number) => {
    if (sectionId == 7 || sectionId == 8) {
      triggerAllMemorial({
        sectionId: sectionId,
      })
        .unwrap()
        .then((data) => {
          dispatch(setMemorial(data));
          navigate("search", { state: { sectionId } });
        })
        .catch((error) => {
          console.error("Ошибка при фильтрации:", error);
        });
    } else if (sectionId == 1) {
      navigate("date", { state: { sectionId } });
    } else {
      triggerGetPeople({
        sectionId: sectionId,
      })
        .unwrap()
        .then((data) => {
          dispatch(setHeroes(data));

          navigate("search", { state: { sectionId } });
        })
        .catch((error) => {
          console.error("Ошибка при фильтрации:", error);
        });
    }
  };

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div className={styles.mainPage}>
      <img className={styles.mainPage__svgStar} src={star_Svg} alt="" />
      <img className={styles.mainPage__svgFlag} src={flag_Svg} alt="" />
      <div className={styles.mainPage__container}>
        <div className={styles.mainPage__container_title}>
          Книга памяти
          <br /> Камбарского района
        </div>
        <div className={styles.mainPage__container_boxField}>
          <div className={styles.mainPage__container_boxField_content}>
            <div className={styles.mainPage__container_boxField_containerText}>
              <h3 className={styles.mainPage__container_boxField_title}>
                Не нашли что искали?
              </h3>
              <p className={styles.mainPage__container_boxField_description}>
                Попробуйте найти своего героя в интернет-архиве
                <br />
                «Память народа»
              </p>
            </div>
            <button className={styles.mainPage__container_boxField_button}>
              <a className={styles.mainPage__container_boxField_buttonLink} href="https://www.gosuslugi.ru">Перейти</a>
              {/* Перейти */}
              <img src={link_Svg} alt="" />
            </button>
          </div>
          <div className={styles.mainPage__container_boxField_decoration}>
            {data?.length &&
              data.map((item, index) => (
                <CardField
                  key={index}
                  onClick={() => HandleClickInput(item.id)}
                  className={styles.mainPage__container_boxField_cardField}
                  imgUrl={`https://api-kambarka-memory-book.itlabs.top${item.image}`}
                >
                  {item.title}
                </CardField>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
