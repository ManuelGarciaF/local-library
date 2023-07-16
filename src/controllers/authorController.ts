import Author from "../models/author";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";

export const authorList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send("Not implemented");
});

export const authorDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send("Not implemented");
});

export const authorCreateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send("Not implemented");
});

export const authorCreatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send("Not implemented");
});

export const authorDeleteGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send("Not implemented");
});

export const authorDeletePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send("Not implemented");
});

export const authorUpdateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send("Not implemented");
});

export const authorUpdatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send("Not implemented");
});
