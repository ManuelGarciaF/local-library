import Genre from "../models/genre";
import Book from "../models/book";
import { Errback } from "express";
import asyncHandler from "express-async-handler";

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
export const genreCreateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create GET");
});

// Handle Genre create on POST.
export const genreCreatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create POST");
});

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
