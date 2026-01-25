import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async (filters = {}, thunkAPI) => {
    try {
      // clear filters
      const params = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== "" && value !== false && value !== null) {
          acc[key] = value;
        }
        return acc;
      }, {});

      const response = await axios.get("/campers", { params });

      return response.data;
    } catch (error) {
      // handle error 404
      // return empty items
      if (error.response && error.response.status === 404) {
        return { items: [], total: 0 };
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/campers/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
