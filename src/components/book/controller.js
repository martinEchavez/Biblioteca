const { get, getBook, create, update, remove } = require('./store');
const response = require('../../network/response');

const getBooks = async () => {
  return await get('book');
};

const getBookByISBN = async (isbn) => {
  const foundBook = await getBook(isbn);
  if (foundBook.length === 0) {
    return response.error('Book not foud', 404, '');
  }
  return response.success('found book', 200, foundBook);
};

const createBock = async (isbn, name, author, status = 'available') => {
  if (
    typeof isbn === 'undefined' ||
    typeof name === 'undefined' ||
    typeof author === 'undefined'
  ) {
    return response.error('isbn, name or author is required', 401);
  }

  const foundBook = await getBook(isbn);

  if (foundBook.length > 0) {
    return response.error(`ISBN ${isbn} already exists`, 401);
  }

  const book = {
    isbn,
    name,
    author,
    status,
  };
  const bookCreated = await create(book);
  if (bookCreated) {
    const book = await getBook(bookCreated[0]);
    return response.success('Book created', 200, book);
  }
};

const updateBook = async (isbn, book) => {
  const result = update(isbn, book);
  if (result === 0) {
    return response.error('book not found', 404);
  }

  const updateBook = await getBook(isbn);
  return response.success('Book updated', 200, updateBook);
};

const deleteBook = async (isbn) => {
  const result = await remove(isbn);
  if (result === 0) {
    return response.error('book not found', 404);
  }

  return response.success('Book deleted', 200);
};

module.exports = {
  getBooks,
  getBookByISBN,
  createBock,
  updateBook,
  deleteBook,
};
