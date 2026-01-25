import { useState, useEffect } from "react";
import VehicleCard from "../VehicleCard/VehicleCard";
import styles from "./VehicleList.module.css";

const VehicleList = ({
  items,
  isLoading = false,
  emptyMessage = "No campers found 😢",
}) => {
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    if (visibleCount > 4) {
      window.scrollBy({
        top: 600,
        behavior: "smooth",
      });
    }
  }, [visibleCount]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  if (isLoading && items.length === 0) {
    return <div className={styles.loading}>Loading campers...</div>;
  }

  if (!isLoading && items.length === 0) {
    return (
      <div className={styles.noResults}>
        <h3>{emptyMessage}</h3>
      </div>
    );
  }

  return (
    <>
      <div className={styles.list}>
        {visibleItems.map((camper) => (
          <VehicleCard key={camper.id} camper={camper} />
        ))}
      </div>

      {hasMore && (
        <button
          className={styles.loadMoreBtn}
          onClick={() => setVisibleCount((prev) => prev + 4)}
        >
          Load more
        </button>
      )}
    </>
  );
};

export default VehicleList;
