const { get, getLoan, create, update, remove } = require('./store');
const {
  palindromeChecker,
  fnEndDate,
  sumDigitIsbn,
} = require('../../helpers/utilDate');
const { getBook } = require('../book/store');

const { success, error } = require('../../network/response');

const getLoanBooks = async () => {
  const loanBooks = await get();
  if (loanBooks) {
    return success('loan books success', 200, loanBooks);
  }
};

const getLoanBookById = async (id) => {
  const foundBook = await getLoan(id);

  if (foundBook.length === 0) {
    return error('loanBook not found', 404);
  }

  return success('Update loan book', 200, foundBook);
};

const createLoanBook = async (bookIsbn, readerName) => {
  let deliverDate = '';

  if (typeof bookIsbn === 'undefined' || typeof readerName === 'undefined') {
    return error('bookIsbn or readerName is required.', 400);
  }

  const foundBook = await getBook(bookIsbn);
  if (foundBook.length > 0) {
    if (foundBook[0].status === 'borrowed') {
      return success('The book is on loan', 200);
    }
  }

  const palindrome = palindromeChecker(bookIsbn);

  if (palindrome) {
    return success('palindrome books can only be used in the library', 200);
  }

  const sumDigits = sumDigitIsbn(bookIsbn);

  if (sumDigits > 30) {
    deliverDate = fnEndDate().toLocaleDateString('es-co');
  }

  let today = new Date();

  const loanBook = {
    loanDate: today.toLocaleDateString('es-co'),
    deliverDate,
    bookIsbn,
    readerName,
  };

  const loanBookCreated = await create(loanBook);
  if (loanBookCreated) {
    const loan = await getLoan(loanBookCreated[0]);
    return success('loanBook created', 200, loan);
  }
};

const updateLoanBook = async (id, loanbook) => {
  const loanBook = await update(id, loanbook);
  if (loanBook === 0) {
    return error('loanBook not found', 404);
  }

  return success('Update loan book', 200, loanBook);
};

const deleteLoanBook = async (id) => {
  const loanBook = await remove(id);

  if (loanBook === 0) {
    return error('book not found', 404);
  }

  return success('loan book deleted', 200);
};

module.exports = {
  getLoanBooks,
  getLoanBookById,
  createLoanBook,
  updateLoanBook,
  deleteLoanBook,
};
