import { UserDto } from "@/dtos/store";

export interface AuthContextType {
    user: UserDto | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}