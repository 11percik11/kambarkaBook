import styles from "./MemoryDataID.module.scss";
import { useLocation, useParams } from "react-router-dom";
import {
  useGetFreeDataAcceptQuery,
  useGetMemorialDataAcceptQuery,
} from "../../entities/Memorial/api/MemorialApi";
import Loader from "../../shared/ui/Loader/Loader";
import AvatarkaMemoryId from "./ui/AvatarkaMemoryId/AvatarkaMemoryId";
import InformationMemoryDataID from "./ui/InformationMemoryDataID/InformationMemoryDataID";
import { Free, Memorial } from "../../entities/Memorial/model/types";

export default function MemoryDataID() {
  const { id } = useParams() as { id: string };
  const number = parseInt(id, 10);
  const location = useLocation();
  const sectionId = location.state.sectionId;
  const { data: memorialData, isLoading: isLoadingMemorial } =
    useGetMemorialDataAcceptQuery(number);

  const { data: freeData, isLoading: isLoadingFree } =
    useGetFreeDataAcceptQuery(number);

  if (sectionId == 7) {
    if (isLoadingMemorial || !memorialData)
      return (
        <div>
          <Loader />
        </div>
      );
  } else if (sectionId == 8) {
    if (isLoadingFree || !freeData)
      return (
        <div>
          <Loader />
        </div>
      );
  }

  return (
    <div className={styles.memoryDataID}>
      <AvatarkaMemoryId
        urlImgAvatarka={
          sectionId == 7 ? memorialData?.memorialImages : freeData?.freeImages
        }
        title={sectionId == 7 ? memorialData?.title : freeData?.title}
      />
      <InformationMemoryDataID
        data={sectionId === 7 ? (memorialData as Memorial) : (freeData as Free)}
      />
    </div>
  );
}
