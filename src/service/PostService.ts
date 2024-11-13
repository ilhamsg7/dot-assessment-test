import { inject, injectable } from "tsyringe";
import BaseService from './BaseService';
import { PrismaClient } from "@prisma/client";
import PostContract from "../contract/PostContract";
import { httpClient } from "../utils/http.utils";
import { PostRequest, PostResponse, UpdatePostRequest } from "../../schema/post";

@injectable()
class PostService extends BaseService<'post'> implements PostContract {
    constructor(@inject("PrismaClient") prisma: PrismaClient) {
        super(prisma, 'post');
    }

    async getAll() {
        const { data } = await httpClient.get("/posts");
        return data;
    }


    async getById(id: number) {
        const { data } = await httpClient.get(`/posts/${id}`);
        return data;
    }

    async createData(data: PostRequest): Promise<PostResponse> {
        const postData = await httpClient.post("/posts", data);

        let result = await this.prisma.post.create({
            data: data,
            select: {
                id: true,
                userId: true,
                title: true,
                body: true,
            }
        });

        let response: PostResponse = {
            message: "Data created successfully",
            data: {
                id: result.id ?? "",
                userId: result.userId ?? "",
                title: result.title ?? "",
                body: result.body ?? "",
            }
        }
        return response;
    }

    async editData(id: number, data: UpdatePostRequest): Promise<PostResponse> {
        const putData = await httpClient.put(`/posts/${id}`, data);

        let result = await this.prisma.post.update({
            where: { id: id },
            data: data,
            select: {
                id: true,
                userId: true,
                title: true,
                body: true,
            }
        });

        let response: PostResponse = {
            message: "Data updated successfully",
            data: {
                id: result.id ?? "",
                userId: result.userId ?? "",
                title: result.title ?? "",
                body: result.body ?? "",
            }
        }
        return response;
    }

    async editDataPatch(id: number, data: UpdatePostRequest): Promise<PostResponse> {
        const putData = await httpClient.patch(`/posts/${id}`, data);

        let result = await this.prisma.post.update({
            where: { id: id },
            data: data,
            select: {
                id: true,
                userId: true,
                title: true,
                body: true,
            }
        });

        let response: PostResponse = {
            message: "Data updated successfully",
            data: {
                id: result.id ?? "",
                userId: result.userId ?? "",
                title: result.title ?? "",
                body: result.body ?? "",
            }
        }
        return response;
    }

    async deleteData(id: number): Promise<boolean> {
        const deleteData = await httpClient.delete(`/posts/${id}`);
        await this.prisma.post.delete({
            where: { id: id }
        });
        return true;
    }
}

export default PostService;