import api from "@/config/axios";
import { StoreDto } from "@/dtos/store";

export const listStores = async (): Promise<StoreDto[]> => {
  const response = await api.get<StoreDto[]>(`stores`);
  return response.data;
};

export const listStoresByDocument = async (document: string): Promise<StoreDto[]> => {
  const response = await api.get<StoreDto[]>(`storesByDocument/${document}`);
  return response.data;
};

export const cleanStores = async (): Promise<any> => {
  const response = await api.delete(`cleanStores`);
  return response.data;
};