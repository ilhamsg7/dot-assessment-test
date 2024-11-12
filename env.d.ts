declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      API_VERSION: string;
      DATABASE_URL: string;
      JWT_SECRET_KEY: string;
      JWT_REFRESH_KEY: string;
      JWT_REFRESH_COOKIE_NAME: string;
      ACCESS_TOKEN_EXPIRED: string;
      REFRESH_TOKEN_EXPIRED: string;
      FILE_SIZE_UPLOAD: string;
      NODE_URL: string;
      ALLOWED_CORS_ORIGIN: string;
      API_URL: string;
    }
  }
}

export { };
