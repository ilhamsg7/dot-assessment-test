import cache from "../utils/cache.utils";
import { NextFunction, Request, Response } from 'express';

const cacheMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if (req.method !== 'GET') return next();

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        res.status(200).json(cachedResponse);
        return;
    }

    const originalJson = res.json.bind(res);
    res.json = (body) => {
        cache.set(key, body);
        return originalJson(body);
    };

    next();
};

export default cacheMiddleware;
