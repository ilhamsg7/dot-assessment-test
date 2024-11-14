import { inject, injectable } from "tsyringe";
import PostService from "../service/PostService";
import { wrapError } from "../utils/wrapper.utils";
import { ApiResponse } from "../responses/ApiResponse";
import { Request, Response } from 'express';
import { postRequest, PostResponse, updatePostRequest } from "../../schema/post";
import PostContract from "../contract/PostContract";

@injectable()
class PostController {
    constructor(@inject("PostContract") private service: PostContract) { }

    async index(req: Request, res: Response) {
        await wrapError(res, async () => {
            const response = await this.service.getAll();
            return ApiResponse.response(res, response, 'Data fetched successfully', false);
        });
    }

    async show(req: Request, res: Response) {
        await wrapError(res, async () => {
            let id = Number(req.params.id);
            const response = await this.service.getById(id);
            return ApiResponse.response(res, response, 'Data fetched successfully', false);
        });
    }

    async create(req: Request, res: Response) {
        await wrapError(res, async () => {
            let dataInput = postRequest.parse(req.body);
            const response = await this.service.createData(dataInput);
            return ApiResponse.response(res, response.data, response.message, false);
        });
    }

    async update(req: Request, res: Response) {
        await wrapError(res, async () => {
            let id = Number(req.params.id);
            let dataInput = updatePostRequest.parse(req.body);
            const response = await this.service.editData(id, dataInput);
            return ApiResponse.response(res, response.data, response.message, false);
        });
    }

    async updatePatch(req: Request, res: Response) {
        await wrapError(res, async () => {
            let id = Number(req.params.id);
            let dataInput = updatePostRequest.parse(req.body);
            const response = await this.service.editData(id, dataInput);
            return ApiResponse.response(res, response.data, response.message, false);
        });
    }

    async delete(req: Request, res: Response) {
        await wrapError(res, async () => {
            let id = Number(req.params.id);
            const response = await this.service.deleteData(id);
            return ApiResponse.response(res, response, 'Data deleted successfully', false);
        });
    }

    async getAllDataFromDatabase(req: Request, res: Response) {
        await wrapError(res, async () => {
            const data = await this.service.all();

            const response: PostResponse = {
                message: "Data fetched successfully",
                data: data.map((item: any) => {
                    return {
                        id: item.id ?? "",
                        title: item.title ?? "",
                        body: item.body ?? "",
                        userId: item.userId ?? "",
                    }
                })
            }
            return ApiResponse.response(res, response.data, response.message, false);
        });
    }

    async getDataByIdFromDatabase(req: Request, res: Response) {
        await wrapError(res, async () => {
            let id = Number(req.params.id);
            const data = await this.service.getById(id);

            const response: PostResponse = {
                message: "Data fetched successfully",
                data: {
                    id: data.id ?? "",
                    title: data.title ?? "",
                    body: data.body ?? "",
                    userId: data.userId ?? "",
                }
            }
            return ApiResponse.response(res, response.data, response.message, false);
        });
    }
}

export default PostController;