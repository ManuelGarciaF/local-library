import Book from "../models/book";
import Author from "../models/author";
import Genre from "../models/genre";
import BookInstance from "../models/bookInstance";
import asyncHandler from "express-async-handler";


export const catalogInfo = asyncHandler(async (req, res, next) => {
  const [
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    BookInstance.countDocuments({}).exec(),
    BookInstance.countDocuments({ status: "Available" }).exec(),
    Author.countDocuments({}).exec(),
    Genre.countDocuments({}).exec()
  ]);

  res.render("catalog", {
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres
  });
});

// Display list of all books.
export const bookList = asyncHandler(async (req, res, next) => {
  const books = await Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec();

  res.render("books", { books });
});

// Display detail page for a specific book.
export const bookDetail = asyncHandler(async (req, res, next) => {
  const [
    book,
    bookInstances
  ] = await Promise.all([
    Book.findById(req.params.id).populate("author").populate("genre").exec(),
    BookInstance.find({ book: req.params.id })
  ]);
  if (book === null) {
    const err: any = new Error("Book not found");
    err.status = 404;
    return next(err);
  }
  res.render("bookdetail", { book, bookInstances});
});

// Display book create form on GET.
export const bookCreateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create GET");
});

// Handle book create on POST.
export const bookCreatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create POST");
});

// Display book delete form on GET.
export const bookDeleteGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
});

// Handle book delete on POST.
export const bookDeletePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
});

// Display book update form on GET.
export const bookUpdateGet = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update GET");
});

// Handle book update on POST.
export const bookUpdatePost = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update POST");
});
