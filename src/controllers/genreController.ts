import Genre from "../models/genre";
import Book from "../models/book";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Display list of all Genre.
export const genreList = asyncHandler(async (req, res, next) => {
  const genres = await Genre.find().sort([["name", "ascending"]]).exec();
  res.render("genres", { genres });
});

// Display detail page for a specific Genre.
export const genreDetail = asyncHandler(async (req, res, next) => {
  const [
    genre,
    booksInGenre
  ] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }).populate("author").exec()
  ]);
  if (genre === null) {
    const err: any = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }
  res.render("genredetail", { genre, booksInGenre });
});

// Display Genre create form on GET.
export const genreCreateGet = (req: Request, res: Response, next: NextFunction) => {
  res.render("genreform", { errors: [], genre: null });
};

// Handle Genre create on POST.
export const genreCreatePost = [
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const name = req.body.name;
    const genre = new Genre({ name });

    // If there are errors.
    if (!errors.isEmpty()) {
      res.render("genreform", { genre, errors: errors.array() });
      return;
    }

    const genreExists = await Genre.findOne({ name }).exec();
    if (genreExists) {
      res.redirect(genreExists.url);
      return;
    }

    await genre.save();
    res.redirect(genre.url);
  }),
];

// Display Genre delete form on GET.
export const genreDeleteGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

// Handle Genre delete on POST.
export const genreDeletePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

// Display Genre update form on GET.
export const genreUpdateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

// Handle Genre update on POST.
export const genreUpdatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});
