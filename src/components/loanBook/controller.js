const knex = require('knex');
const config = require('../../database/conection');
const db = knex(config);

const getLoanBooks = async () => {
  return await await db('loanbook');
};

const getLoanBookById = async (id) => {
  return await db('loanbook').where('id', '=', id);
};

const createLoanBook = async (loanbook) => {
  const response = await db('loanbook').insert(loanbook);
  return response[0];
};

const updateLoanBook = async (id, loanbook) => {
  return await db('book').where('id', '=', id).update(loanbook);
};

const deleteLoanBook = async (id) => {
  return await db('book').where('id', '=', id).del();
};

module.exports = {
  getLoanBooks,
  getLoanBookById,
  createLoanBook,
  updateLoanBook,
  deleteLoanBook,
};
