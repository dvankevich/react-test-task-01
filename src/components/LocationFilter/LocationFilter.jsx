import { useDispatch, useSelector } from "react-redux";
import Select from "react-select"; // Імпортуємо бібліотеку
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

// Перетворюємо масив рядків у формат, який розуміє react-select: { value, label }
const options = cities.map((city) => ({ value: city, label: city }));

const LocationFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  // Функція зміни значення
  const handleChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";

    dispatch(setFilter({ location: value }));
    dispatch(fetchCampers({ ...filters, location: value }));
  };

  // Кастомні стилі для react-select, щоб він виглядав як ваш дизайн
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "var(--inputs)", // Ваш колір фону
      borderRadius: "12px",
      border: state.isFocused
        ? "1px solid var(--button)"
        : "1px solid transparent",
      padding: "6px 0 6px 40px", // Відступ зліва для іконки мапи
      boxShadow: "none", // Прибираємо стандартну тінь
      cursor: "pointer",
      "&:hover": {
        border: "1px solid var(--button)",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--main)", // Колір тексту
      fontSize: "16px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "var(--text)", // Колір плейсхолдера
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "var(--main)",
      transition: "transform 0.2s",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      paddingRight: "18px",
    }),
    indicatorSeparator: () => ({ display: "none" }), // Прибираємо паличку розділювач
    menu: (provided) => ({
      ...provided,
      borderRadius: "12px",
      marginTop: "4px",
      boxShadow: "0px 4px 36px rgba(0, 0, 0, 0.08)",
      zIndex: 100, // Щоб список був поверх усього
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "var(--inputs)" : "white",
      color: state.isFocused ? "var(--button)" : "var(--main)",
      cursor: "pointer",
      padding: "10px 20px",
    }),
  };

  return (
    <div className={styles.container}>
      <p className={styles.label}>Location</p>

      <div className={styles.inputWrapper}>
        {/* Ваша іконка мапи залишається тут, позиціонована абсолютно */}
        <Icon icon="bi:map" className={styles.inputIcon} width="20" />

        <Select
          options={options}
          styles={customStyles}
          placeholder="City, Ukraine"
          isClearable // Додає хрестик для очищення
          value={options.find((opt) => opt.value === filters.location) || null} // Синхронізація з Redux
          onChange={handleChange}
          // Ці пропси вимикають зайві бордери самого інпуту всередині селекту
          components={{
            Input: (props) => (
              <components.Input {...props} aria-label="Location" />
            ),
          }}
        />
      </div>
    </div>
  );
};

// Невеликий хак, щоб мати доступ до components.Input, якщо треба (або видаліть components prop вище)
import { components } from "react-select";

export default LocationFilter;
