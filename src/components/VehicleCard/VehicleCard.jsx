import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../Icons";
import { toggleFavorite } from "../../redux/favorites/slice";
import { selectIsFavorite } from "../../redux/selectors";
import styles from "./VehicleCard.module.css";
import { featureConfig } from "../../constants/features";
import { Link } from "react-router-dom";

const VehicleCard = ({ camper }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(camper.id));
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
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
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
          <Link
            to={`/catalog/${camper.id}/reviews`}
            aria-label={`View ${camper.reviews?.length} reviews`}
          >
            <span className={styles.rating}>
              <Icons.StarFull color="var(--rating)" aria-hidden="true" />
              {camper.rating}({camper.reviews?.length || 0} Reviews)
            </span>
          </Link>

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

        <Link to={`/catalog/${camper.id}`} className={styles.showMoreBtn}>
          Show more
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;
