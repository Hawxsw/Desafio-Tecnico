// biome-ignore assist/source/organizeImports: <explanation>
import type { CreateUserType } from "@/schemas/user.schema";
import type { AxiosInstance } from "axios";

export class UserService {
    constructor(private api: AxiosInstance) {}

    async createUser(payload: CreateUserType) {
        const { data } = await this.api.post('/users', payload);
        return data;
    }
}