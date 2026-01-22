import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../redux/campers/operations";
import { setFilter } from "../redux/filters/slice";
//import { toggleFavorite } from "../redux/favorites/slice";
import {
  selectCampers,
  selectIsLoading,
  selectFilters,
  //selectFavorites,
} from "../redux/selectors";
// import MyIconsComponent from "./MyIconsComponent/MyIconsComponent";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import VehicleCard from "./VehicleCard/VehicleCard";
import FilterSidebar from "./FilterSidebar/FilterSidebar";

const App = () => {
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(4);
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const filters = useSelector(selectFilters);
  //const favorites = useSelector(selectFavorites);

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

        <FilterSidebar />

        {/* --- СПИСОК --- */}
        {/* <p>
          Favorites count: <strong>{favorites.length}</strong>
        </p> */}

        {isLoading ? (
          <p>Loading campers...</p>
        ) : (
          <div>
            <div>
              {visibleCampers.length > 0 ? (
                visibleCampers.map((camper) => (
                  <VehicleCard key={camper.id} camper={camper} />
                ))
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
