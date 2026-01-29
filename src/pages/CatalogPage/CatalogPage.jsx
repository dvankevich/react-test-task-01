import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
//import CamperList from "../../components/CamperList/CamperList";
import styles from "./CatalogPage.module.css";
import VehicleList from "../../components/VehicleList/VehicleList";
import { useSelector } from "react-redux";
import { selectCampers, selectIsLoading } from "../../redux/selectors";

const CatalogPage = () => {
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      <title>Catalog</title>
      <main className={styles.container}>
        <FilterSidebar />
        <section>
          {/* <CamperList /> */}

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
