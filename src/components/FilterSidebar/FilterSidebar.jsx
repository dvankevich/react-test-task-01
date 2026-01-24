import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { setFilter } from "../../redux/filters/slice";
import { fetchCampers } from "../../redux/campers/operations";
import { selectFilters } from "../../redux/selectors";
import LocationFilter from "../LocationFilter/LocationFilter";
import styles from "./FilterSidebar.module.css";

// Повний список опцій згідно з вашим запитом
const equipmentOptions = [
  { name: "AC", icon: "bi:wind", label: "AC" },
  { name: "transmission", icon: "bi:diagram-3", label: "Automatic" },
  { name: "kitchen", icon: "bi:cup-hot", label: "Kitchen" },
  { name: "TV", icon: "bi:display", label: "TV" },
  { name: "bathroom", icon: "ph:shower", label: "Bathroom" },
  { name: "refrigerator", icon: "lucide:refrigerator", label: "Refrigerator" },
  { name: "microwave", icon: "lucide:microwave", label: "Microwave" },
  { name: "gas", icon: "hugeicons:gas-stove", label: "Gas" },
  { name: "water", icon: "ion:water-outline", label: "Water" },
];

const typeOptions = [
  { value: "panelTruck", icon: "bi:grid-1x2", label: "Van" },
  { value: "fullyIntegrated", icon: "bi:grid", label: "Fully Integrated" },
  { value: "alcove", icon: "bi:grid-3x3-gap", label: "Alcove" },
];

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const handleEquipmentToggle = (name) => {
    if (name === "transmission") {
      // Спеціальна логіка для трансмісії (рядкове значення)
      const newValue = filters.transmission === "automatic" ? "" : "automatic";
      dispatch(setFilter({ transmission: newValue }));
    } else {
      // Стандартна логіка для булевих значень (true/false)
      dispatch(setFilter({ [name]: !filters[name] }));
    }
  };

  const handleFormToggle = (value) => {
    const newValue = filters.form === value ? "" : value;
    dispatch(setFilter({ form: newValue }));
  };

  const onSearch = () => {
    // Відправляємо запит на сервер із застосованими фільтрами
    dispatch(fetchCampers(filters));
  };

  return (
    <aside className={styles.sidebar}>
      <LocationFilter />

      <div className={styles.filtersGroup}>
        <p className={styles.filtersTitle}>Filters</p>

        {/* Vehicle equipment section */}
        <section>
          <h3 className={styles.sectionTitle}>Vehicle equipment</h3>
          <div className={styles.filterGrid}>
            {equipmentOptions.map((option) => {
              const isActive =
                option.name === "transmission"
                  ? filters.transmission === "automatic"
                  : !!filters[option.name];

              return (
                <button
                  key={option.name}
                  type="button"
                  className={`${styles.filterItem} ${isActive ? styles.filterItemActive : ""}`}
                  onClick={() => handleEquipmentToggle(option.name)}
                >
                  <Icon icon={option.icon} width="32" height="32" />
                  <span className={styles.filterLabel}>{option.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Vehicle type section */}
        <section>
          <h3 className={styles.sectionTitle}>Vehicle type</h3>
          <div className={styles.filterGrid}>
            {typeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`${styles.filterItem} ${
                  filters.form === option.value ? styles.filterItemActive : ""
                }`}
                onClick={() => handleFormToggle(option.value)}
              >
                <Icon icon={option.icon} width="32" height="32" />
                <span className={styles.filterLabel}>{option.label}</span>
              </button>
            ))}
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
