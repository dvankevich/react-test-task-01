import { useEffect } from "react";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import styles from "./CatalogPage.module.css";
import VehicleList from "../../components/VehicleList/VehicleList";
import { useSelector } from "react-redux";
import { selectCampers, selectIsLoading } from "../../redux/selectors";
import { useDispatch } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import Seo from "../../components/SEO/SEO";

const CatalogPage = () => {
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampers({}));
  }, [dispatch]);

  return (
    <>
      <Seo
        title="Catalog"
        description="Discover the best camper rentals in Ukraine for your next adventure."
      />
      <h1 className={styles.visuallyHidden}>Campers catalog page</h1>
      <main className={styles.container}>
        <FilterSidebar />
        <section className={styles.catalogSection}>
          <VehicleList
            items={campers}
            isLoading={isLoading}
            emptyMessage="No campers found for these filters 😢"
          />
        </section>
      </main>
    </>
  );
};

export default CatalogPage;
