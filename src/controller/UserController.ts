import { inject, injectable } from "tsyringe";
import UserService from "../service/UserService";
import { Request, Response } from 'express';
import { wrapError } from "../utils/wrapper.utils";
import { ApiResponse } from "../responses/ApiResponse";
import { registerRequest, RegisterResponse, updateUserRequest } from "../../schema/auth";

@injectable()
class UserController {
    constructor(@inject("UserContract") private service: UserService) { }

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
            let dataInput = registerRequest.parse(req.body);
            const response = await this.service.createData(dataInput);
            return ApiResponse.response(res, response.data, response.message, false);
        });
    }

    async update(req: Request, res: Response) {
        await wrapError(res, async () => {
            let id = Number(req.params.id);
            let dataInput = updateUserRequest.parse(req.body);
            const response = await this.service.editData(id, dataInput);
            return ApiResponse.response(res, response.data, response.message, false);
        });
    }

    async updatePatch(req: Request, res: Response) {
        await wrapError(res, async () => {
            let id = Number(req.params.id);
            let dataInput = updateUserRequest.parse(req.body);
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

            const response: RegisterResponse = {
                message: "Data fetched successfully",
                data: data.map((item: any) => {
                    return {
                        name: item.name ?? "",
                        email: item.email ?? "",
                        userName: item.userName ?? "",
                        phone: item.phone ?? "",
                    }
                })
            }
            return ApiResponse.response(res, response.data, response.message, false);
        });
    }

    async getDataByIdFromDatabase(req: Request, res: Response) {
        await wrapError(res, async () => {
            let id = Number(req.params.id);
            const data = await this.service.findById(id);
            const response: RegisterResponse = {
                message: "Data fetched successfully",
                data: {
                    name: data.name ?? "",
                    email: data.email ?? "",
                    userName: data.userName ?? "",
                    phone: data.phone ?? "",

                }
            }
            return ApiResponse.response(res, response.data, response.message, false);
        });
    }
}

export default UserController;