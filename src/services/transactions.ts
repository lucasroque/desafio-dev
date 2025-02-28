import api from "@/config/axios";
import { StoreDto } from "@/dtos/store";

export const processTransactions = async (formData: FormData): Promise<StoreDto[]> => {

  const { data } = await api.post("processTransactions", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};
