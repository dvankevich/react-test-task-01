// pages/FavoritesPage/FavoritesPage.jsx
import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/selectors";
import VehicleList from "../../components/VehicleList/VehicleList";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const favorites = useSelector(selectFavorites);

  return (
    <div className={styles.wrapper}>
      <VehicleList
        items={favorites}
        emptyMessage="Your favorites list is empty 💙"
      />
    </div>
  );
};

export default FavoritesPage;
