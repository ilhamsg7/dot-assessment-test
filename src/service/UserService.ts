import { PrismaClient } from '@prisma/client';
import BaseService from './BaseService';
import UserContract from '../contract/UserContract';
import { injectable, inject } from 'tsyringe';
import { httpClient } from "../utils/http.utils";
import { RegisterRequest, RegisterResponse, UpdateUserRequest } from '../../schema/auth';
import bcrypt from "bcryptjs";

@injectable()
class UserService extends BaseService<'user'> implements UserContract {
    constructor(@inject("PrismaClient") prisma: PrismaClient) {
        super(prisma, 'user');
    }

    async getAll() {
        const { data } = await httpClient.get("/users");
        return data;
    }


    async getById(id: number) {
        const { data } = await httpClient.get(`/users/${id}`);
        return data;
    }

    async createData(data: RegisterRequest): Promise<RegisterResponse> {
        const { password, ...postData } = data;
        await httpClient.post("/users", postData);

        let dataPasswords = await bcrypt.hash(password, 10);

        let result = await this.prisma.user.create({
            data: {
                ...postData,
                password: dataPasswords,
            },
            select: {
                name: true,
                email: true,
                userName: true,
                phone: true,
            }
        });

        let response: RegisterResponse = {
            message: "Data created successfully",
            data: {
                name: result.name ?? "",
                email: result.email ?? "",
                userName: result.userName ?? "",
                phone: result.phone ?? "",
            }
        }
        return response;
    }

    async editData(id: number, data: UpdateUserRequest): Promise<RegisterResponse> {
        const putData = await httpClient.put(`/users/${id}`, data);

        let result = await this.prisma.user.update({
            where: { id: id },
            data: data,
            select: {
                name: true,
                email: true,
                userName: true,
                phone: true,
            }
        });

        let response: RegisterResponse = {
            message: "Data updated successfully",
            data: {
                name: result.name ?? "",
                email: result.email ?? "",
                userName: result.userName ?? "",
                phone: result.phone ?? "",
            }
        }
        return response;
    }

    async editDataPatch(id: number, data: UpdateUserRequest): Promise<RegisterResponse> {
        const patchData = await httpClient.patch(`/users/${id}`, data);

        let result = await this.prisma.user.update({
            where: { id: id },
            data: data,
            select: {
                name: true,
                email: true,
                userName: true,
                phone: true,
            }
        });

        let response: RegisterResponse = {
            message: "Data updated successfully",
            data: {
                name: result.name ?? "",
                email: result.email ?? "",
                userName: result.userName ?? "",
                phone: result.phone ?? "",
            }
        }
        return response;
    }

    async deleteData(id: number): Promise<boolean> {
        const deleteData = await httpClient.delete(`/users/${id}`);
        await this.prisma.user.delete({
            where: { id: id }
        });
        return true;
    }
}

export default UserService;
