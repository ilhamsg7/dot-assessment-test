import { Response } from 'express';

export class ApiResponse {
    static response(res: Response, data: any, message = 'Success', pagination = false) {
        if (pagination) {
            return res.json({
                success: true,
                message,
                data: data.data,
                meta: data.meta,
            });
        } else {
            return res.status(200).json({
                success: true,
                message,
                data,
            });
        }
    }

    static error(res: Response, message: string, status = 500) {
        return res.status(status).json({
            success: false,
            message,
        });
    }
}
