import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import { selectFavorites } from "../../redux/selectors";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const favorites = useSelector(selectFavorites);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    if (visibleCount > 4) {
      window.scrollBy({
        top: 600,
        behavior: "smooth",
      });
    }
  }, [visibleCount]);

  const visibleFavorites = favorites.slice(0, visibleCount);
  const hasMore = visibleCount < favorites.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  if (favorites.length === 0) {
    return (
      <div className={styles.noResults}>
        <h3>Your favorites list is empty 💙</h3>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {visibleFavorites.map((camper) => (
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

export default FavoritesPage;
