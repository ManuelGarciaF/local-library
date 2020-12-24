const BookInstance = require('../models/book-instance');

// Display list of all BookInstances.
exports.bookinstance_list = (req, res) => {
  BookInstance.find({})
    .populate('book')
    .then((bookInstances) => {
      // Sort bookInstances by the book's title.
      const sortedBookInstances = bookInstances.sort((a, b) => {
        if (a.book.title.toUpperCase() < b.book.title.toUpperCase()) {
          return -1;
        }
        return 1;
      });

      res.render('bookinstance-list', {
        title: 'Book Instance list',
        bookInstanceList: sortedBookInstances,
      });
    });
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance create GET');
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance create POST');
};

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = (req, res) => {
  res.send('NOTIMPLEMENTED: BookInstance delete POST');
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance update POST');
};
