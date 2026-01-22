import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { setFilter } from "../../redux/filters/slice";
import { fetchCampers } from "../../redux/campers/operations";
import { selectFilters } from "../../redux/selectors";
import styles from "./FilterSidebar.module.css";

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const handleLocationChange = (e) => {
    dispatch(setFilter({ location: e.target.value }));
  };

  const handleEquipmentToggle = (name) => {
    // Якщо це transmission, логіка трохи інша (automatic/null)
    if (name === "transmission") {
      const newValue = filters.transmission === "automatic" ? "" : "automatic";
      dispatch(setFilter({ transmission: newValue }));
    } else {
      dispatch(setFilter({ [name]: !filters[name] }));
    }
  };

  const handleFormToggle = (value) => {
    const newValue = filters.form === value ? "" : value;
    dispatch(setFilter({ form: newValue }));
  };

  const onSearch = () => {
    dispatch(fetchCampers(filters));
  };

  return (
    <aside className={styles.sidebar}>
      {/* Location */}
      <div className={styles.locationSection}>
        <label className={styles.label}>Location</label>
        <div className={styles.inputWrapper}>
          <Icon icon="bi:map" className={styles.inputIcon} width="20" />
          <input
            type="text"
            className={styles.locationInput}
            placeholder="Kyiv, Ukraine"
            value={filters.location}
            onChange={handleLocationChange}
          />
        </div>
      </div>

      <div className={styles.filtersGroup}>
        <p className={styles.filtersTitle}>Filters</p>

        {/* Vehicle equipment */}
        <div>
          <h3 className={styles.sectionTitle}>Vehicle equipment</h3>
          <div className={styles.filterGrid}>
            <button
              className={`${styles.filterItem} ${filters.AC ? styles.filterItemActive : ""}`}
              onClick={() => handleEquipmentToggle("AC")}
            >
              <Icon icon="bi:wind" width="32" />
              <span>AC</span>
            </button>

            <button
              className={`${styles.filterItem} ${filters.transmission === "automatic" ? styles.filterItemActive : ""}`}
              onClick={() => handleEquipmentToggle("transmission")}
            >
              <Icon icon="bi:diagram-3" width="32" />
              <span>Automatic</span>
            </button>

            <button
              className={`${styles.filterItem} ${filters.kitchen ? styles.filterItemActive : ""}`}
              onClick={() => handleEquipmentToggle("kitchen")}
            >
              <Icon icon="bi:cup-hot" width="32" />
              <span>Kitchen</span>
            </button>

            <button
              className={`${styles.filterItem} ${filters.TV ? styles.filterItemActive : ""}`}
              onClick={() => handleEquipmentToggle("TV")}
            >
              <Icon icon="bi:display" width="32" />
              <span>TV</span>
            </button>

            <button
              className={`${styles.filterItem} ${filters.bathroom ? styles.filterItemActive : ""}`}
              onClick={() => handleEquipmentToggle("bathroom")}
            >
              <Icon icon="ph:shower" width="32" />
              <span>Bathroom</span>
            </button>
          </div>
        </div>

        {/* Vehicle type */}
        <div>
          <h3 className={styles.sectionTitle}>Vehicle type</h3>
          <div className={styles.filterGrid}>
            <button
              className={`${styles.filterItem} ${filters.form === "panelTruck" ? styles.filterItemActive : ""}`}
              onClick={() => handleFormToggle("panelTruck")}
            >
              <Icon icon="bi:grid-1x2" width="32" />
              <span>Van</span>
            </button>
            <button
              className={`${styles.filterItem} ${filters.form === "fullyIntegrated" ? styles.filterItemActive : ""}`}
              onClick={() => handleFormToggle("fullyIntegrated")}
            >
              <Icon icon="bi:grid" width="32" />
              <span>Fully Integrated</span>
            </button>
            <button
              className={`${styles.filterItem} ${filters.form === "alcove" ? styles.filterItemActive : ""}`}
              onClick={() => handleFormToggle("alcove")}
            >
              <Icon icon="bi:grid-3x3-gap" width="32" />
              <span>Alcove</span>
            </button>
          </div>
        </div>
      </div>

      <button className={styles.searchBtn} onClick={onSearch}>
        Search
      </button>
    </aside>
  );
};

export default FilterSidebar;
