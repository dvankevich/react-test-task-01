import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { setFilter } from "../../redux/filters/slice";
import { fetchCampers } from "../../redux/campers/operations";
import { selectFilters } from "../../redux/selectors";
import styles from "./LocationFilter.module.css";

const cities = [
  "Dnipro",
  "Kharkiv",
  "Kyiv",
  "Lviv",
  "Odesa",
  "Poltava",
  "Sumy",
];

const LocationFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;

    // 1. Записуємо в стейт фільтрів
    dispatch(setFilter({ location: newLocation }));

    // 2. Формуємо оновлений об'єкт фільтрів для запиту
    // (бо Redux state оновиться асинхронно, а нам треба актуальні дані прямо зараз)
    const updatedFilters = {
      ...filters,
      location: newLocation,
    };

    // 3. Робимо запит (як у твоєму прикладі App.js)
    dispatch(fetchCampers(updatedFilters));
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>Location</label>
      <div className={styles.inputWrapper}>
        <Icon icon="bi:map" className={styles.inputIcon} width="20" />
        <select
          className={styles.locationSelect}
          value={filters.location}
          onChange={handleLocationChange}
        >
          {/* Пусте значення для вибору "Всі міста" */}
          <option value="">All locations</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LocationFilter;
