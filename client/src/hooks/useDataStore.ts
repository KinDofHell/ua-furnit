import { create } from "zustand";
import { AxiosResponse } from "axios";

import axiosInstance from "../utils/axiosInstance";

import { FurnitureType } from "../types/furnitureTypes";

interface DataState<T> {
  data: FurnitureType[];
  dataOne: FurnitureType;
  categories: T;
  fetchData: (url: string) => Promise<void>;
  fetchCategories: (url: string) => Promise<void>;
  fetchFurnitureById: (id: string) => Promise<void>;
}

export const useDataStore = create<DataState<FurnitureType[]>>((set) => ({
  data: [],
  dataOne: {},
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
  fetchFurnitureById: async (url: string) => {
    try {
      const response: AxiosResponse<FurnitureType> = await axiosInstance.get(
        url
      );
      set({ dataOne: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));
