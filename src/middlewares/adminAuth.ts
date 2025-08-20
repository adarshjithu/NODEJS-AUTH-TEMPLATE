import { NextFunction, Request, Response } from "express";

export const adminAuth = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        next();
    };
};
