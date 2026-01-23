import { useState } from "react";
import { useSelector } from "react-redux";
import VehicleCard from "../VehicleCard/VehicleCard";
import { selectCampers, selectIsLoading } from "../../redux/selectors";
import styles from "./CamperList.module.css";

const CamperList = () => {
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);

  const [visibleCount, setVisibleCount] = useState(4);
  const [prevCampers, setPrevCampers] = useState(campers);

  // Скидання стану ПІД ЧАС рендеру
  if (campers !== prevCampers) {
    setPrevCampers(campers);
    setVisibleCount(4);
  }

  const visibleCampers = campers.slice(0, visibleCount);
  const hasMore = visibleCount < campers.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  if (isLoading && campers.length === 0) {
    return <p className={styles.loading}>Loading campers...</p>;
  }

  if (!isLoading && campers.length === 0) {
    return (
      <div className={styles.noResults}>
        <h3>No campers found for these filters 😢</h3>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {visibleCampers.map((camper) => (
          <VehicleCard key={camper.id} camper={camper} />
        ))}
      </div>

      {hasMore && (
        <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

export default CamperList;
