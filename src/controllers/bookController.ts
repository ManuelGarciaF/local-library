import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import Book from "../models/book";
import Author from "../models/author";
import Genre from "../models/genre";
import BookInstance from "../models/bookInstance";
import { NextFunction } from "express";

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
  res.render("bookdetail", { book, bookInstances });
});

// Display book create form on GET.
export const bookCreateGet = asyncHandler(async (req, res, next) => {
  const [authors, genres] = await Promise.all([
    Author.find({}, "first_name family_name").sort({ family_name: 1 }).exec(),
    Genre.find().sort({ name: 1 }).exec()
  ])

  res.render("bookform", {
    authors,
    genres,
    selectedAuthorId: '',
    errors: [],
    book: null,
  });
});

// Handle book create on POST.
export const bookCreatePost = [
  // Convert the genres to an array.
  (req, res, next) => {
    // Handle either 0 or 1 genre.
    if (!(req.body.genre instanceof Array)) {
      req.body.genre = (typeof req.body.genre === "undefined") ? [] : [req.body.genre];
    }
    next();
  },

  body("title", "Title must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("genre.*").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    });

    if (!errors.isEmpty()) {
      const [authors, genres] = await Promise.all([
        Author.find({}, "first_name family_name").sort({ first_name: 1 }).exec(),
        Genre.find().sort({ name: 1 }).exec()
      ]);

      // Mark genres as checked
      genres.map((genre: any) => {
        if (book.genre.includes(genre.id)) {
          genre.checked = true;
        }
        return genre;
      })

      res.render("bookform", {
        authors,
        genres,
        book,
        selectedAuthorId: book.author._id.toString(),
        errors: errors.array(),
      });
      return;
    }

    await book.save();
    res.redirect(book.url);
  })
];

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
