// pages/FavoritesPage/FavoritesPage.jsx
import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/selectors";
import VehicleList from "../../components/VehicleList/VehicleList";
import styles from "./FavoritesPage.module.css";
import SEO from "../../components/SEO/SEO";

const FavoritesPage = () => {
  const favorites = useSelector(selectFavorites);

  return (
    <div className={styles.favoritesContainer}>
      <SEO
        title="Favorites"
        description="Discover the best camper rentals in Ukraine for your next adventure."
      />
      <div className={styles.wrapper}>
        <VehicleList
          items={favorites}
          emptyMessage="Your favorites list is empty 💙"
        />
      </div>
    </div>
  );
};

export default FavoritesPage;
