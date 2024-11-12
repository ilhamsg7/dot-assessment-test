import { inject, injectable } from "tsyringe";
import AuthContract from "../contract/AuthContract";
import { wrapError } from "../utils/wrapper.utils";
import { ApiResponse } from "../responses/ApiResponse";
import { Request, Response } from 'express';
import { authRequest, registerRequest } from "../../schema/auth";


@injectable()
class AuthController {
    constructor(@inject('AuthContract') private service: AuthContract) {}

    async login(req: Request, res: Response) {
        await wrapError(res, async () => {
            let request = authRequest.parse(req.body);
            const response = await this.service.login(request);
            return ApiResponse.response(res, response, 'Login success', true);
        });
    }

    async register(req: Request, res: Response) {
        await wrapError(res, async () => {
            let request = registerRequest.parse(req.body);
            const response = await this.service.register(request);
            return ApiResponse.response(res, response, 'Register success', true);
        });
    }
}

export default AuthController;