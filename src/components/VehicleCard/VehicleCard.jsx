import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../Icons";
import { toggleFavorite } from "../../redux/favorites/slice";
import { selectFavorites } from "../../redux/selectors";
import styles from "./VehicleCard.module.css";
import { featureConfig } from "../../constants/features";

const VehicleCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const isFavorite = favorites.some((fav) => fav.id === camper.id);
  const formattedPrice = `€${camper.price.toFixed(2)}`;

  const allFeatures = featureConfig;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={camper.gallery[0]?.thumb}
          alt={camper.name}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{camper.name}</h2>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>{formattedPrice}</span>
            <button
              className={styles.favoriteBtn}
              onClick={() => dispatch(toggleFavorite(camper))}
            >
              {isFavorite ? (
                <Icons.HeartFill color="var(--button)" width="24" height="24" />
              ) : (
                <Icons.Heart color="var(--main)" width="24" height="24" />
              )}
            </button>
          </div>
        </div>

        <div className={styles.infoRow}>
          <a
            href={`/catalog/${camper.id}/reviews`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.rating}>
              <Icons.StarFull color="var(--rating)" />
              {camper.rating}({camper.reviews?.length || 0} Reviews)
            </span>
          </a>

          <span className={styles.location}>
            <Icons.Map />
            {camper.location}
          </span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.categories}>
          {allFeatures.map((feature) => {
            const isVisible =
              typeof camper[feature.key] === "boolean"
                ? camper[feature.key]
                : !!camper[feature.key];

            if (!isVisible) return null;

            const IconComponent = feature.icon;

            return (
              <div key={feature.key} className={styles.category}>
                <IconComponent />
                <span className={styles.capitalize}>
                  {feature.label(camper)}
                </span>
              </div>
            );
          })}
        </div>

        <a
          href={`/catalog/${camper.id}`}
          className={styles.showMoreBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          Show more
        </a>
      </div>
    </div>
  );
};

export default VehicleCard;
