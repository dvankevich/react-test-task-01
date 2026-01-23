import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCampers } from "../redux/campers/operations";
import Header from "./Header/Header";
import HomePage from "../pages/HomePage/HomePage";
import CatalogPage from "../pages/CatalogPage/CatalogPage";
import CamperPage from "../pages/CamperPage/CamperPage";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCampers({}));
  }, [dispatch]);
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperPage />} />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </>
  );
};

export default App;
