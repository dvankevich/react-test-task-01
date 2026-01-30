import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../Icons";
import { setFilter } from "../../redux/filters/slice";
import { fetchCampers } from "../../redux/campers/operations";
import { selectFilters } from "../../redux/selectors";
import LocationFilter from "../LocationFilter/LocationFilter";
import styles from "./FilterSidebar.module.css";

const equipmentOptions = [
  { name: "AC", icon: Icons.AC, label: "AC" },
  { name: "transmission", icon: Icons.Transmission, label: "Automatic" },
  { name: "kitchen", icon: Icons.Kitchen, label: "Kitchen" },
  { name: "TV", icon: Icons.Display, label: "TV" },
  { name: "bathroom", icon: Icons.Bathroom, label: "Bathroom" },
  { name: "refrigerator", icon: Icons.Fridge, label: "Refrigerator" },
  { name: "microwave", icon: Icons.Microwave, label: "Microwave" },
  { name: "gas", icon: Icons.Gas, label: "Gas" },
  { name: "water", icon: Icons.Water, label: "Water" },
];

const typeOptions = [
  { value: "panelTruck", icon: Icons.Van, label: "Van" },
  {
    value: "fullyIntegrated",
    icon: Icons.FullyIntegrated,
    label: "Fully Integrated",
  },
  { value: "alcove", icon: Icons.Alcove, label: "Alcove" },
];

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const handleEquipmentToggle = (name) => {
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
      <LocationFilter />

      <div className={styles.filtersGroup}>
        <p className={styles.filtersTitle}>Filters</p>

        <section>
          <h3 className={styles.sectionTitle}>Vehicle equipment</h3>
          <div className={styles.filterGrid}>
            {equipmentOptions.map((option) => {
              const isActive =
                option.name === "transmission"
                  ? filters.transmission === "automatic"
                  : !!filters[option.name];

              const IconComponent = option.icon;

              return (
                <button
                  key={option.name}
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`Filter by ${option.label}`}
                  className={`${styles.filterItem} ${isActive ? styles.filterItemActive : ""}`}
                  onClick={() => handleEquipmentToggle(option.name)}
                >
                  <IconComponent width="32" height="32" aria-hidden="true" />
                  <span className={styles.filterLabel}>{option.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h3 className={styles.sectionTitle}>Vehicle type</h3>
          <div className={styles.filterGrid}>
            {typeOptions.map((option) => {
              const IconComponent = option.icon;

              return (
                <button
                  key={option.value}
                  type="button"
                  className={`${styles.filterItem} ${
                    filters.form === option.value ? styles.filterItemActive : ""
                  }`}
                  onClick={() => handleFormToggle(option.value)}
                >
                  <IconComponent width="32" height="32" />
                  <span className={styles.filterLabel}>{option.label}</span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <button className={styles.searchBtn} onClick={onSearch}>
        Search
      </button>
    </aside>
  );
};

export default FilterSidebar;
