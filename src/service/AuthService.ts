import { PrismaClient } from '@prisma/client';
import BaseService from './BaseService';
import AuthContract from '../contract/AuthContract';
import { injectable, inject } from 'tsyringe';
import { AuthRequest, AuthResponse, RegisterRequest, RegisterResponse } from '../../schema/auth/index';
import jwtUtils from '../utils/jwt.utils';

@injectable()
class AuthService extends BaseService<'user'> implements AuthContract {
    constructor(@inject("PrismaClient") prisma: PrismaClient) {
        super(prisma, 'user');
    }

    async login(request: AuthRequest): Promise<AuthResponse> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: request.email,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }

        if (user.password !== request.password) {
            throw new Error("Invalid password");
        }

        const accessToken = await jwtUtils.accessToken({
            id: user.id,
            email: user.email,
        })

        const refreshToken = await jwtUtils.refreshToken({
            id: user.id,
            email: user.email,
        })

        let response: AuthResponse = {
            message: "success login",
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken,
            }
        }

        return response;
    }

    async register(request: RegisterRequest): Promise<RegisterResponse> {
        const user = await this.prisma.user.create({
            data: {
                email: request.email,
                password: request.password,
                userName: request.userName,
                firstName: request.firstName,
                lastName: request.lastName,
            }
        });

        let response: RegisterResponse = {
            message: "success register",
            data: {
                email: user.email,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName
            }
        }
        return response;
    }
}

export default AuthService;