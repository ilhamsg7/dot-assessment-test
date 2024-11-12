import { env } from "../env";
import jwt from "jwt-promisify";

type TokenPayload = {
    id: string;
    email: string;
    // role: string;
    // status: string;
}

export default {
    accessToken: (payload: TokenPayload) =>
        jwt.sign(payload, env.JWT_SECRET_KEY!, {
            expiresIn: env.ACCESS_TOKEN_EXPIRED,
            algorithm: "HS256",
        }),

    refreshToken: (payload: TokenPayload) =>
        jwt.sign(payload, env.JWT_REFRESH_KEY, {
            expiresIn: env.REFRESH_TOKEN_EXPIRED,
            algorithm: "HS256",
        }),

    verify: (token: string) => jwt.verify(token, env.JWT_SECRET_KEY!),

    verifyRefreshToken: (token: string) =>
        jwt.verify(token, env.JWT_REFRESH_KEY, { algorithms: ["HS256"] }),

    decode: (token: string) => jwt.decode(token),
};