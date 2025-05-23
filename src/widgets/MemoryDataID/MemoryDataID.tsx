import styles from './MemoryDataID.module.scss';
import { useParams } from 'react-router-dom';
import { useGetMemorialDataAcceptQuery } from '../../entities/Memorial/api/MemorialApi';
import Loader from '../../shared/ui/Loader/Loader';
import AvatarkaMemoryId from './ui/AvatarkaMemoryId/AvatarkaMemoryId';
import InformationMemoryDataID from './ui/InformationMemoryDataID/InformationMemoryDataID';


export default function MemoryDataID() {
      const { id } = useParams() as { id: string };
      const number = parseInt(id, 10);
      const { data, isLoading } = useGetMemorialDataAcceptQuery(number);
      
      if (isLoading || !data) return <div><Loader/></div>;
      console.log(data?.memorialImages);
      
  return (
    <div className={styles.memoryDataID}>
        <AvatarkaMemoryId urlImgAvatarka={data?.memorialImages} title={data?.title}/>
        <InformationMemoryDataID data={data}/>
    </div>
  )
}
