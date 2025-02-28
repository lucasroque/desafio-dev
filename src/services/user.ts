
import api from "@/config/axios";
import { UserDto } from "@/dtos/user";

export const findUserRequest = async (id: string): Promise<UserDto> => {
    const response = await api.get<UserDto>(`/user/${id}`);
    return response.data;
};