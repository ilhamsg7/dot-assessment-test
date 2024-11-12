import { type Response } from "express";
import { ZodError } from "zod";
// import Sentry from "@sentry/node";
import 'dotenv/config';

export const wrapError = async (res: Response, process: Function) => {
    try {
        await process()
    } catch (err: any) {
        if (err instanceof ZodError) {
            res.status(400).json({ message: "invalid request", errors: err.formErrors.fieldErrors });
        } else {
            //Sentry.captureException(err);
            console.error(err)
            res.status(400).json({ message: err?.message ?? "unknown exception" });
        }
    }
}
