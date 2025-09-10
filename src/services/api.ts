import axios, { type AxiosInstance } from "axios";
import { UserService } from "./clients/user.service";
import { AuthService } from "./clients/auth.service";
import { ProductService } from "./clients/product.service";

export interface IPaginationResponse<T> {
    data: T[];
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
}

export class ApiService {
    public api: AxiosInstance;
    readonly user: UserService;
    readonly auth: AuthService;
    readonly product: ProductService;

    private API_URL = "https://api-teste-front-production.up.railway.app";

    constructor() {
        const api = axios.create({
            baseURL: this.API_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });

        api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("token");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.api = api;
        this.user = new UserService(this.api);
        this.auth = new AuthService(this.api);
        this.product = new ProductService(this.api);
    }
}

export const api = new ApiService();