import { useParams } from 'react-router-dom';
import { useGetPersonalDataAcceptQuery } from '../../entities/Hero/api/HeroApi';
import styles from './FieldDataID.module.scss';
import AvatarkaDataID from './ui/AvatarkaDataID/AvatarkaDataID';
import InformationDataID from './ui/InformationDataID/InformationDataID';
import Loader from '../../shared/ui/Loader/Loader';

export default function FieldDataID() {
  const { id } = useParams() as { id: string };
  const number = parseInt(id, 10);
  const { data, isLoading } = useGetPersonalDataAcceptQuery(number);
  // console.log(data);
  
  if (isLoading) return <div><Loader/></div>;
// console.log(data?.peopleImages);

  return (
    <div className={styles.fieldDataID}>
        <AvatarkaDataID urlImgAvatarka={data?.peopleImages} surname={data?.surname} name={data?.name} patronymic={data?.patronymic} />
        <InformationDataID data={data}/>
    </div>
  )
}
