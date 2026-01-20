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
        <input
          type="text"
          placeholder="Enter location (e.g. Lviv)"
          value={filters.location}
          onChange={handleLocationChange}
        />
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
