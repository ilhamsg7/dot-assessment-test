import { z } from "zod";
import { BaseResponse } from "../base";

export const authRequest = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const registerRequest = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
    phone: z.string().min(10),
    userName: z.string().min(5),
});

export const updateUserRequest = z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    phone: z.string().min(10).optional(),
    userName: z.string().min(5).optional(),
});

export type AuthRequest = z.infer<typeof authRequest>;
export type RegisterRequest = z.infer<typeof registerRequest>;
export type UpdateUserRequest = z.infer<typeof updateUserRequest>;

export type authResponse = {
    user: {
        id: string,
        email: string,
        name: string,
        phone: string,
        userName: string,
    },
    token: string,
};

export type registerResponse = {
    email: string,
    name: string,
    phone: string,
    userName: string,
};

type Response = {
    accessToken: string;
    refreshToken: string;
};

export type AuthResponse = BaseResponse<Response>;
export type RegisterResponse = BaseResponse<registerResponse>;
