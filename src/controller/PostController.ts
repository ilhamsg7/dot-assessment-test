import { inject, injectable } from "tsyringe";
import PostService from "../service/PostService";
import { wrapError } from "../utils/wrapper.utils";
import { ApiResponse } from "../responses/ApiResponse";
import { Request, Response } from 'express';
import { postRequest, updatePostRequest } from "../../schema/post";

@injectable()
class PostController {
    constructor(@inject("PostContract") private service: PostService) { }

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
            return ApiResponse.response(res, response, 'Data created successfully', false);
        });
    }

    async update(req: Request, res: Response) {
        await wrapError(res, async () => {
            let id = Number(req.params.id);
            let dataInput = updatePostRequest.parse(req.body);
            const response = await this.service.editData(id, dataInput);
            return ApiResponse.response(res, response, 'Data updated successfully', false);
        });
    }

    async delete(req: Request, res: Response) {
        await wrapError(res, async () => {
            let id = Number(req.params.id);
            const response = await this.service.deleteData(id);
            return ApiResponse.response(res, response, 'Data deleted successfully', false);
        });
    }
}

export default PostController;