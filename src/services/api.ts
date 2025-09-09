import axios, { type AxiosInstance } from "axios";
import { UserService } from "./clients/user.service";
import { AuthService } from "./clients/auth.service";
import { ProductService } from "./clients/product.service";


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