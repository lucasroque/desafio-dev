import { StoreDto } from "./store";

export type UserDto = {
    id: string;
    email: string;
    document: string;
    role: string;
    store: StoreDto | null;
  };