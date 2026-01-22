import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { toggleFavorite } from "../../redux/favorites/slice";
import { selectFavorites } from "../../redux/selectors";
import styles from "./VehicleCard.module.css";

const VehicleCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const isFavorite = favorites.some((fav) => fav.id === camper.id);

  // Форматування ціни
  const formattedPrice = `€${camper.price.toFixed(2)}`;

  return (
    <div className={styles.card}>
      {/* Фото */}
      <div className={styles.imageWrapper}>
        <img
          src={camper.gallery[0]?.thumb}
          alt={camper.name}
          className={styles.image}
        />
      </div>

      {/* Контент */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{camper.name}</h2>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>{formattedPrice}</span>
            <button
              className={styles.favoriteBtn}
              onClick={() => dispatch(toggleFavorite(camper))}
            >
              <Icon
                icon={isFavorite ? "bi:heart-fill" : "bi:heart"}
                color={isFavorite ? "var(--button)" : "var(--main)"}
                width="24"
              />
            </button>
          </div>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.rating}>
            <Icon icon="bi:star-fill" color="var(--rating)" />
            {camper.rating}({camper.reviews?.length || 0} Reviews)
          </span>
          <span className={styles.location}>
            <Icon icon="bi:map" />
            {camper.location}
          </span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        {/* Категорії/Бейджи */}
        <div className={styles.categories}>
          <div className={styles.category}>
            <Icon icon="bi:diagram-3" />
            {camper.transmission}
          </div>
          <div className={styles.category}>
            <Icon icon="bi:fuel-pump" />
            {camper.engine}
          </div>
          {camper.kitchen && (
            <div className={styles.category}>
              <Icon icon="bi:cup-hot" />
              Kitchen
            </div>
          )}
          {camper.AC && (
            <div className={styles.category}>
              <Icon icon="bi:wind" />
              AC
            </div>
          )}
        </div>

        <button className={styles.showMoreBtn}>Show more</button>
      </div>
    </div>
  );
};

export default VehicleCard;
