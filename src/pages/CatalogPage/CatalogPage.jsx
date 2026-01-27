import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import CamperList from "../../components/CamperList/CamperList";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  return (
    <>
      <title>Catalog</title>
      <main className={styles.container}>
        <FilterSidebar />
        <section>
          <CamperList />
        </section>
      </main>
    </>
  );
};

export default CatalogPage;
