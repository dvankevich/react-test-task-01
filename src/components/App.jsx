import "./App.css";
import { useEffect, useState } from "react";
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
// import MyIconsComponent from "./MyIconsComponent/MyIconsComponent";
import ThemeToggle from "./ThemeToggle/ThemeToggle";

const App = () => {
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(4);
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const filters = useSelector(selectFilters);
  const favorites = useSelector(selectFavorites);

  const cities = [
    "Dnipro",
    "Kharkiv",
    "Kyiv",
    "Lviv",
    "Odesa",
    "Poltava",
    "Sumy",
  ];

  const forms = ["panelTruck", "fullyIntegrated", "alcove"];

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

  useEffect(() => {
    dispatch(fetchCampers({}));
  }, [dispatch]);

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setVisibleCount(4);
    dispatch(setFilter({ location: newLocation }));
    const updatedFilters = {
      ...filters,
      location: newLocation,
    };
    dispatch(fetchCampers(updatedFilters));
  };

  const handleSearch = () => {
    setVisibleCount(4);
    dispatch(fetchCampers(filters));
  };

  const handleCheckboxChange = (name) => (e) => {
    dispatch(setFilter({ [name]: e.target.checked }));
  };

  const handleTransmissionToggle = (e) => {
    const value = e.target.checked ? "automatic" : "";
    dispatch(setFilter({ transmission: value }));
  };

  const handleFormToggle = (value) => {
    const newValue = filters.form === value ? "" : value;
    dispatch(setFilter({ form: newValue }));
  };

  const visibleCampers = campers.slice(0, visibleCount);
  const hasMore = visibleCount < campers.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
      <header style={{ position: "absolute", top: "20px", right: "20px" }}>
        <ThemeToggle />
      </header>

      <div style={{ padding: "20px" }}>
        <h1>Camper Rental Test</h1>

        {/*  <h2>Icons</h2>
        <MyIconsComponent /> */}

        <section
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <h3>Filters</h3>

          {/* --- ЛОКАЦІЯ  --- */}
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
              <option value="">All locations</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* --- ТИП КУЗОВА --- */}
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
            <div style={{ display: "flex", gap: "10px" }}>
              {forms.map((type) => (
                <button
                  key={type}
                  onClick={() => handleFormToggle(type)}
                  style={{
                    padding: "10px 15px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    backgroundColor: filters.form === type ? "#007bff" : "#fff",
                    color: filters.form === type ? "#fff" : "#000",
                    transition: "all 0.2s ease",
                  }}
                >
                  {type === "panelTruck"
                    ? "Van"
                    : type === "fullyIntegrated"
                      ? "Fully Integrated"
                      : "Alcove"}
                </button>
              ))}
            </div>
          </div>

          {/* --- ТРАНСМІСІЯ --- */}
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
                checked={filters.transmission === "automatic"}
                onChange={handleTransmissionToggle}
              />
              Show only Automatic
            </label>
          </div>

          {/* --- ОБЛАДНАННЯ --- */}
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
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
                    padding: "5px",
                    border: "1px solid #eee",
                    borderRadius: "4px",
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

          <button
            onClick={handleSearch}
            style={{
              padding: "10px 25px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Apply Other Filters
          </button>
        </section>

        {/* --- СПИСОК --- */}
        {/* <p>
          Favorites count: <strong>{favorites.length}</strong>
        </p> */}

        {isLoading ? (
          <p>Loading campers...</p>
        ) : (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              {visibleCampers.length > 0 ? (
                visibleCampers.map((camper) => {
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
                        style={{
                          width: "100%",
                          height: "180px",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                      <h3>{camper.name}</h3>
                      <p>Price: {camper.price} UAH</p>
                      <p>📍 {camper.location}</p>
                      <button
                        onClick={() => dispatch(toggleFavorite(camper))}
                        style={{
                          backgroundColor: isFav ? "#ff4d4f" : "#f0f0f0",
                          color: isFav ? "white" : "black",
                          border: "none",
                          padding: "8px 12px",
                          cursor: "pointer",
                          borderRadius: "4px",
                          width: "100%",
                          marginTop: "10px",
                        }}
                      >
                        {isFav ? "❤️ In Favorites" : "🤍 Add to Favorites"}
                      </button>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#666",
                  }}
                >
                  <h3>No campers found 😢</h3>
                </div>
              )}
            </div>

            {hasMore && !isLoading && (
              <button
                onClick={handleLoadMore}
                style={{
                  display: "block",
                  margin: "0 auto",
                  padding: "12px 30px",
                  backgroundColor: "transparent",
                  color: "#101828",
                  border: "1px solid #475467",
                  borderRadius: "200px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Load more
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
