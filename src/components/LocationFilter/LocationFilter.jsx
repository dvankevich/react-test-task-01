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
  const [isBrowsingAll, setIsBrowsingAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);

  const filteredCities =
    isBrowsingAll || inputValue.trim() === ""
      ? cities
      : cities.filter((city) =>
          city.toLowerCase().includes(inputValue.toLowerCase()),
        );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsBrowsingAll(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (city) => {
    if (!city) return;
    setInputValue(city);
    setIsOpen(false);
    setIsBrowsingAll(false);
    setActiveIndex(-1);

    dispatch(setFilter({ location: city }));
    dispatch(fetchCampers({ ...filters, location: city }));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);
    setIsBrowsingAll(false);
    setActiveIndex(-1);

    if (value === "") {
      dispatch(setFilter({ location: "" }));
      dispatch(fetchCampers({ ...filters, location: "" }));
    }
  };

  const toggleDropdown = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsBrowsingAll(true);
      setActiveIndex(-1);
    } else {
      setIsOpen(false);
      setIsBrowsingAll(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < filteredCities.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        if (activeIndex >= 0) {
          handleSelect(filteredCities[activeIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container} ref={wrapperRef}>
      <p className={styles.label}>Location</p>

      <div className={styles.inputWrapper}>
        <Icon icon="bi:map" className={styles.inputIcon} width="20" />

        <input
          type="text"
          className={styles.locationInput}
          placeholder="City, Ukraine"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsOpen(true);
            setIsBrowsingAll(true);
            setActiveIndex(-1);
          }}
        />

        <Icon
          icon="bi:chevron-down"
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
          width="20"
          onClick={toggleDropdown}
        />

        {isOpen && (
          <ul className={styles.dropdown}>
            {filteredCities.length > 0 ? (
              filteredCities.map((city, index) => (
                <li
                  key={city}
                  className={`${styles.dropdownItem} ${index === activeIndex ? styles.activeItem : ""}`}
                  onClick={() => handleSelect(city)}
                  onMouseEnter={() => setActiveIndex(index)}
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
