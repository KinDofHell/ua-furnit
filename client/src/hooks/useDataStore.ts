import { create } from "zustand";
import { AxiosResponse } from "axios";

import axiosInstance from "../utils/axiosInstance";

import { FurnitureType } from "../types/furnitureTypes";

interface DataState<T> {
  data: FurnitureType[];
  dataOne: FurnitureType;
  categories: T;
  questions: T;
  fetchData: (url: string) => Promise<void>;
  fetchCategories: (url: string) => Promise<void>;
  fetchFurnitureById: (id: string) => Promise<void>;
  fetchQuestionsByWord: (word: string) => Promise<void>;
}

export const useDataStore = create<DataState<FurnitureType[]>>((set) => ({
  data: [],
  dataOne: {},
  categories: [],
  questions: [],
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
  fetchQuestionsByWord: async (url: string) => {
    try {
      const response: AxiosResponse<FurnitureType[]> = await axiosInstance.get(
        url
      );
      set({ questions: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));
