const knex = require('knex');
const config = require('../../database/conection');
const db = knex(config);

const getBooks = async () => {
  return await await db('book');
};

const getBookByISBN = async (isbn) => {
  return await db('book').where('isbn', '=', isbn);
};

const createBock = async (book) => {
  return await db('book').insert(book);
};

const updateBook = async (isbn, book) => {
  return await db('book').where('isbn', '=', isbn).update(book);
};

const deleteBook = async (isbn) => {
  return await db('book').where('isbn', '=', isbn).del();
};

module.exports = {
  get: getBooks,
  getBook: getBookByISBN,
  create: createBock,
  update: updateBook,
  remove: deleteBook,
};
