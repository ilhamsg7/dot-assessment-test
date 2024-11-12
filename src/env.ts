import { serverSchema } from "../schema/base/server.schema";

export const env = serverSchema.parse(process.env);