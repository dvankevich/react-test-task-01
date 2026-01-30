import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Icons } from "../Icons";
import clsx from "clsx";
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

const options = cities.map((city) => ({ value: city, label: city }));

const LocationFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const handleChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    dispatch(setFilter({ location: value }));
    dispatch(fetchCampers({ ...filters, location: value }));
  };

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="location-select">
        Location
      </label>

      <div className={styles.inputWrapper}>
        <Icons.Map className={styles.inputIcon} width="20" height="20" />

        <Select
          id="location-select"
          instanceId="location-select"
          aria-label="Select city"
          options={options}
          placeholder="City, Ukraine"
          isClearable
          value={options.find((opt) => opt.value === filters.location) || null}
          onChange={handleChange}
          unstyled
          classNames={{
            control: ({ isFocused }) =>
              clsx(styles.control, isFocused && styles.controlFocused),
            singleValue: () => styles.singleValue,
            placeholder: () => styles.placeholder,
            menu: () => styles.menu,
            menuList: () => styles.menuList,
            option: ({ isFocused, isSelected }) =>
              clsx(styles.option, {
                [styles.optionFocused]: isFocused,
                [styles.optionSelected]: isSelected,
              }),
            dropdownIndicator: ({ selectProps }) =>
              clsx(
                styles.dropdownIndicator,
                selectProps.menuIsOpen && styles.dropdownIndicatorOpen,
              ),
            indicatorSeparator: () => styles.indicatorSeparator,
            input: () => styles.inputFix,
          }}
        />
      </div>
    </div>
  );
};

export default LocationFilter;
