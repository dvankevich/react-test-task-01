import { useState, useRef, useEffect } from "react";
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

  const [inputValue, setInputValue] = useState(filters.location || "");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Логіка фільтрації: якщо нічого не введено - показуємо ВСІ міста.
  // Якщо є текст - фільтруємо.
  const filteredCities =
    inputValue.trim() === ""
      ? cities
      : cities.filter((city) =>
          city.toLowerCase().includes(inputValue.toLowerCase()),
        );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (city) => {
    setInputValue(city);
    setIsOpen(false);

    dispatch(setFilter({ location: city }));
    dispatch(fetchCampers({ ...filters, location: city }));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true); // Відкриваємо список при друці

    if (value === "") {
      dispatch(setFilter({ location: "" }));
      dispatch(fetchCampers({ ...filters, location: "" }));
    }
  };

  return (
    <div className={styles.container} ref={wrapperRef}>
      <p className={styles.label}>Location</p>

      <div className={styles.inputWrapper}>
        {/* Іконка мапи зліва */}
        <Icon icon="bi:map" className={styles.inputIcon} width="20" />

        <input
          type="text"
          className={styles.locationInput}
          placeholder="City, Ukraine"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
        />

        {/* ОСЬ ВІН: Шеврон (стрілочка) справа */}
        <Icon
          icon="bi:chevron-down"
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
          width="20"
          onClick={() => setIsOpen(!isOpen)}
        />

        {/* Список підказок */}
        {isOpen && (
          <ul className={styles.dropdown}>
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <li
                  key={city}
                  className={styles.dropdownItem}
                  onClick={() => handleSelect(city)}
                >
                  <Icon icon="bi:geo-alt" width="16" />
                  {city}
                </li>
              ))
            ) : (
              <li className={styles.noResults}>No cities found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LocationFilter;
