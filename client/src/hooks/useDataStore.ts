import { create } from "zustand";
import { AxiosResponse } from "axios";

import axiosInstance from "../utils/axiosInstance";

interface FurnitureType {
  [key: string]: any;
}

interface DataState<T> {
  data: T;
  fetchData: (url: string) => Promise<void>;
}

export const useDataStore = create<DataState<FurnitureType[]>>((set) => ({
  data: [],
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
}));
