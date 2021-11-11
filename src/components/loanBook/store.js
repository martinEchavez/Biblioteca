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
  return await db('loanbook').insert(loanbook);
};

const updateLoanBook = async (id, loanbook) => {
  return await db('loanbook').where('id', '=', id).update(loanbook);
};

const deleteLoanBook = async (id) => {
  return await db('loanbook').where('id', '=', id).del();
};

module.exports = {
  get: getLoanBooks,
  getLoan: getLoanBookById,
  create: createLoanBook,
  update: updateLoanBook,
  remove: deleteLoanBook,
};
