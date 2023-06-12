import { create } from "zustand";
import { AxiosResponse } from "axios";

import axiosInstance from "../utils/axiosInstance";

interface FurnitureType {
  [key: string]: any;
}

interface DataState<T> {
  data: T;
  categories: T;
  fetchData: (url: string) => Promise<void>;
  fetchCategories: (url: string) => Promise<void>;
}

export const useDataStore = create<DataState<FurnitureType[]>>((set) => ({
  data: [],
  categories: [],
  fetchData: async (url: string) => {
    try {
      const response: AxiosResponse<FurnitureType[]> = await axiosInstance.get(
        url
      );
      set({ data: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  fetchCategories: async (url: string) => {
    try {
      const response: AxiosResponse<FurnitureType[]> = await axiosInstance.get(
        url
      );
      set({ categories: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));
