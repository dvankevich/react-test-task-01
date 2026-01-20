import "./App.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../redux/campers/operations";
import { setFilter } from "../redux/filters/slice";
import { toggleFavorite } from "../redux/favorites/slice";
import {
  selectCampers,
  selectIsLoading,
  selectFilters,
  selectFavorites,
} from "../redux/selectors";

const App = () => {
  const dispatch = useDispatch();

  // Отримуємо дані зі стору
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const filters = useSelector(selectFilters);
  const favorites = useSelector(selectFavorites);

  const equipmentFilters = [
    "AC",
    "bathroom",
    "kitchen",
    "TV",
    "radio",
    "refrigerator",
    "microwave",
    "gas",
    "water",
  ];

  // Варіанти для типу кузова (form)
  const formOptions = [
    { label: "All types", value: "" },
    { label: "Van (Panel Truck)", value: "panelTruck" },
    { label: "Fully Integrated", value: "fullyIntegrated" },
    { label: "Alcove", value: "alcove" },
  ];

  // Хендлер для зміни типу кузова
  const handleFormChange = (e) => {
    dispatch(setFilter({ form: e.target.value }));
  };

  // Перше завантаження при старті
  useEffect(() => {
    dispatch(fetchCampers(filters));
  }, [dispatch]);

  // Хендлер для зміни фільтра локації
  const handleLocationChange = (e) => {
    dispatch(setFilter({ location: e.target.value }));
  };

  // Хендлер для пошуку
  const handleSearch = () => {
    dispatch(fetchCampers(filters));
  };

  const handleCheckboxChange = (name) => (e) => {
    dispatch(setFilter({ [name]: e.target.checked }));
  };

  const handleTransmissionToggle = (e) => {
    // Якщо чекбокс натиснуто (true) -> "automatic"
    // Якщо галочку знято (false) -> "" (порожній рядок)
    const value = e.target.checked ? "automatic" : "";
    dispatch(setFilter({ transmission: value }));
  };

  // Варіанти кузова (точно як в API)
  const forms = ["panelTruck", "fullyIntegrated", "alcove"];

  // Хендлер для вибору: якщо клікаємо по вже вибраному — скидаємо в ""
  const handleFormToggle = (value) => {
    const newValue = filters.form === value ? "" : value;
    dispatch(setFilter({ form: newValue }));
  };

  const cities = [
    "Dnipro",
    "Kharkiv",
    "Kyiv",
    "Lviv",
    "Odesa",
    "Poltava",
    "Sumy",
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Camper Rental Test</h1>

      {/* Секція фільтрів */}
      <section
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <h3>Filters</h3>
        {/* --- НОВИЙ СЕЛЕКТ ДЛЯ ЛОКАЦІЙ --- */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Location:
          </label>
          <select
            value={filters.location}
            onChange={handleLocationChange}
            style={{ padding: "8px", width: "200px", cursor: "pointer" }}
          >
            {/* Опція для скидання фільтру (null/пусте значення) */}
            <option value="">All locations</option>

            {/* Рендер міст зі списку */}
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {forms.map((type) => (
            <button
              key={type}
              onClick={() => handleFormToggle(type)}
              style={{
                padding: "10px 15px",
                cursor: "pointer",
                borderRadius: "8px",
                border: "1px solid #ccc",
                // Якщо вибрано — підсвічуємо синім
                backgroundColor: filters.form === type ? "#007bff" : "#fff",
                color: filters.form === type ? "#fff" : "#000",
                transition: "all 0.2s ease",
              }}
            >
              {/* Форматуємо назву для читабельності (напр. panelTruck -> Panel Truck) */}
              {type === "panelTruck"
                ? "Van"
                : type === "fullyIntegrated"
                  ? "Fully Integrated"
                  : "Alcove"}
            </button>
          ))}
        </div>

        {/* --- ФІЛЬТР FORM (TYPE) --- */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Vehicle Type:
          </label>
          <select
            value={filters.form}
            onChange={handleFormChange}
            style={{ padding: "5px", minWidth: "200px" }}
          >
            {formOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* --- ВАРІАНТ З RADIO BUTTONS (як альтернатива Select) --- */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Vehicle Type (Radio):
          </label>
          {formOptions.map((opt) => (
            <label
              key={opt.value}
              style={{ marginRight: "10px", cursor: "pointer" }}
            >
              <input
                type="radio"
                name="camperForm"
                value={opt.value}
                checked={filters.form === opt.value}
                onChange={handleFormChange}
              />
              {opt.label}
            </label>
          ))}
        </div>

        {/* ТРАНСМІСІЯ */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <input
              type="checkbox"
              // Тепер він "активний", тільки якщо в стейті саме "automatic"
              checked={filters.transmission === "automatic"}
              onChange={handleTransmissionToggle}
            />
            Show only Automatic
          </label>
        </div>

        {/* Чекбокси обладнання */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Equipment:
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {equipmentFilters.map((item) => (
              <label
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  textTransform: "capitalize",
                  cursor: "pointer",
                  padding: "5px 10px",
                  border: "1px solid #eee",
                  borderRadius: "5px",
                }}
              >
                <input
                  type="checkbox"
                  checked={filters[item]}
                  onChange={handleCheckboxChange(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
          Search
        </button>
      </section>

      {/* Секція статусу обраного */}
      <p>
        Favorites count: <strong>{favorites.length}</strong>
      </p>

      {/* Список кемперів */}
      {isLoading ? (
        <p>Loading campers...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {campers.map((camper) => {
            const isFav = favorites.some((fav) => fav.id === camper.id);

            return (
              <div
                key={camper.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={camper.gallery[0].thumb}
                  alt={camper.name}
                  style={{ width: "100%" }}
                />
                <h3>{camper.name}</h3>
                <p>Price: {camper.price} UAH</p>
                <p>Location: {camper.location}</p>

                <button
                  onClick={() => dispatch(toggleFavorite(camper))}
                  style={{
                    backgroundColor: isFav ? "red" : "gray",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  {isFav ? "❤️ In Favorites" : "🤍 Add to Favorites"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
