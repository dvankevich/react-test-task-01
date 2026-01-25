import { useSelector } from "react-redux";
import { selectCampers, selectIsLoading } from "../../redux/selectors";
import VehicleList from "../VehicleList/VehicleList";
import styles from "./CamperList.module.css";

const CamperList = () => {
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className={styles.wrapper}>
      <VehicleList
        items={campers}
        isLoading={isLoading}
        emptyMessage="No campers found for these filters 😢"
      />
    </div>
  );
};

export default CamperList;
