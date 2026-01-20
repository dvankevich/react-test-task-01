import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { campersReducer } from "./campers/slice";
import { filtersReducer } from "./filters/slice";
import { favoritesReducer } from "./favorites/slice";

const persistConfig = {
  key: "campers",
  storage,
  whitelist: ["favorites"], // Зберігаємо тільки список обраного
};

const rootReducer = combineReducers({
  campers: campersReducer,
  filters: filtersReducer,
  favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ігноруємо системні екшени redux-persist, щоб не було помилок у консолі
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
