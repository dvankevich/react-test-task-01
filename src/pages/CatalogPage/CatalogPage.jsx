import { useSelector } from "react-redux";
import { useState } from "react";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import { selectCampers, selectIsLoading } from "../../redux/selectors";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);

  const [visibleCount, setVisibleCount] = useState(4);
  const visibleCampers = campers.slice(0, visibleCount);
  const hasMore = visibleCount < campers.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <main className={styles.container}>
      {/* Ліва частина: Фільтри */}
      <FilterSidebar />

      {/* Права частина: Список та кнопка */}
      <section className={styles.catalogSection}>
        {isLoading && campers.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.list}>
            {visibleCampers.length > 0 ? (
              visibleCampers.map((camper) => (
                <VehicleCard key={camper.id} camper={camper} />
              ))
            ) : (
              <div className={styles.noResults}>
                <h3>No campers found for these filters.</h3>
              </div>
            )}
          </div>
        )}

        {hasMore && !isLoading && (
          <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </section>
    </main>
  );
};

export default CatalogPage;
