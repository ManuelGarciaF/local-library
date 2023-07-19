import Author from "../models/author";
import Book from "../models/book";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

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
  res.render("authorform", { errors: [], author: null });
});

export const authorCreatePost = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    if (!errors.isEmpty()) {
      res.render("authorform", { errors: errors.array(), author });
      return;
    }

    await author.save();

    res.redirect(author.url);
  }),
];

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
