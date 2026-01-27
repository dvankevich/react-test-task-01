import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { toggleFavorite } from "../../redux/favorites/slice";
import { selectFavorites } from "../../redux/selectors";
import styles from "./VehicleCard.module.css";

const VehicleCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const isFavorite = favorites.some((fav) => fav.id === camper.id);

  const formattedPrice = `€${camper.price.toFixed(2)}`;

  const allFeatures = [
    { key: "transmission", icon: "bi:diagram-3", label: (c) => c.transmission },
    { key: "engine", icon: "bi:fuel-pump", label: (c) => c.engine },
    { key: "AC", icon: "bi:wind", label: () => "AC" },
    { key: "bathroom", icon: "ph:shower", label: () => "Bathroom" },
    { key: "kitchen", icon: "bi:cup-hot", label: () => "Kitchen" },
    { key: "TV", icon: "bi:tv", label: () => "TV" },
    { key: "radio", icon: "bi:ui-radios", label: () => "Radio" },
    {
      key: "refrigerator",
      icon: "lucide:refrigerator",
      label: () => "Refrigerator",
    },
    { key: "microwave", icon: "lucide:microwave", label: () => "Microwave" },
    { key: "gas", icon: "hugeicons:gas-stove", label: () => "Gas" },
    { key: "water", icon: "ion:water-outline", label: () => "Water" },
  ];

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
          {allFeatures.map((feature) => {
            const isVisible =
              typeof camper[feature.key] === "boolean"
                ? camper[feature.key]
                : !!camper[feature.key];

            if (!isVisible) return null;

            return (
              <div key={feature.key} className={styles.category}>
                <Icon icon={feature.icon} />
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
