import Author from "../models/author";
import Book from "../models/book";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";

export const authorList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authors: any = await Author.find().sort([["family_name", "ascending"]]).exec();
  res.render("authors", { authors });
});

export const authorDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const [author, books] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }).populate("genre").sort({ title: 1 }).exec()
  ]);
  res.render("authordetail", { author, books });
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
