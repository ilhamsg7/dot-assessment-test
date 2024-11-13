import axios from "axios";
import { env } from "../env";

export const httpClient = axios.create({
    baseURL: env.API_URL!,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});