const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/book-instance');

exports.index = (req, res) => {
  Promise.all([
    Book.countDocuments({}),
    BookInstance.countDocuments({}),
    BookInstance.countDocuments({ status: 'Available' }),
    Author.countDocuments({}),
    Genre.countDocuments({}),
  ])
    .then((results) => {
      // Map results from queries to an object.
      const data = {
        books: results[0],
        bookInstances: results[1],
        bookInstancesAvailable: results[2],
        authors: results[3],
        genres: results[4],
      };
      res.render('index', { data, title: 'Local Library Home' });
    })
    .catch((err) => {
      res.status(500);
      res.render('error', { message: 'Database error', error: { status: 500 } });
    });
};

// Display list of all books.
exports.book_list = async (req, res) => {
  const books = await Book.find({}, 'title author').populate('author').exec();
  res.render('book-list', { title: 'Book List', bookList: books });
};

// Display detail page for a specific book.
exports.book_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
};

// Display book create form on GET.
exports.book_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.book_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Book create POST');
};

// Display book delete form on GET.
exports.book_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Book update POST');
};
