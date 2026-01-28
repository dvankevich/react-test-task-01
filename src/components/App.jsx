import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { fetchCampers } from "../redux/campers/operations";
import Header from "./Header/Header";
import HomePage from "../pages/HomePage/HomePage";

const CatalogPage = lazy(() => import("../pages/CatalogPage/CatalogPage"));
const CamperDetailsPage = lazy(
  () => import("../pages/CamperDetailsPage/CamperDetailsPage"),
);
const FavoritesPage = lazy(
  () => import("../pages/FavoritesPage/FavoritesPage"),
);

const CamperFeatures = lazy(() => import("./CamperFeatures/CamperFeatures"));
const CamperReviews = lazy(() => import("./CamperReviews/CamperReviews"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampers({}));
  }, [dispatch]);

  return (
    <>
      <Header />

      <Suspense
        fallback={
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            Loading page...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />

          <Route path="/catalog/:id" element={<CamperDetailsPage />}>
            <Route index element={<Navigate to="features" replace />} />
            <Route path="features" element={<CamperFeatures />} />
            <Route path="reviews" element={<CamperReviews />} />
          </Route>

          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
