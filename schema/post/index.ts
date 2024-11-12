import { z } from "zod";
import { BaseResponse } from "../base";

export const postRequest = z.object({
    userId: z.number(),
    title: z.string().min(5),
    body: z.string().min(10),
});

export const updatePostRequest = z.object({
    title: z.string().min(5).optional(),
    body: z.string().min(10).optional(),
});

export type PostRequest = z.infer<typeof postRequest>;
export type UpdatePostRequest = z.infer<typeof updatePostRequest>;

export type postResponse = {
    id: number,
    userId: number,
    title: string,
    body: string,
};

export type PostResponse = BaseResponse<postResponse>;