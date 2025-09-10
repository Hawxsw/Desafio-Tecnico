// biome-ignore assist/source/organizeImports: <explanation>
import type {  LoginType } from "@/lib/user/user.schema";
import type { AxiosInstance } from "axios";

export class AuthService {
    constructor(private api: AxiosInstance) {}

    async login(payload: LoginType) {
        const { data } = await this.api.post('/auth/login', payload);
        return data;
    }
}