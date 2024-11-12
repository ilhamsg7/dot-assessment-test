import { z } from "zod";

export const serverSchema = z.object({
  PORT: z.coerce.number(),
  API_VERSION: z.coerce.number(),
  DATABASE_URL: z.string(),
  JWT_SECRET_KEY: z.string(),
  JWT_REFRESH_KEY: z.string(),
  ACCESS_TOKEN_EXPIRED: z.string(),
  REFRESH_TOKEN_EXPIRED: z.string(),
  REFRESH_TOKEN_COOKIE_TTL_DAYS: z.coerce.number(),
  FILE_SIZE_UPLOAD: z.coerce.number(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  IS_DEV: z.boolean().default(true),
  NODE_URL: z.string(),
  JWT_REFRESH_COOKIE_NAME: z.string(),
  ALLOWED_CORS_ORIGIN: z.string().transform((val) => val.split(",")),
  API_URL: z.string()
});

export type ServerSchema = z.infer<typeof serverSchema>;