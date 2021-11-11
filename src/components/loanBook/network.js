const express = require('express');
const { palindromeChecker } = require('../../helpers');
const { authentication } = require('../../middleware/authentication');
const { getBookByISBN } = require('../book/controller');
const {
  getLoanBooks,
  createLoanBook,
  updateLoanBook,
  getLoanBookById,
  deleteLoanBook,
} = require('./controller');

const router = express.Router();

router.get('/', authentication, async (req, res) => {
  try {
    const loanBooks = await getLoanBooks();

    res.status(200).send({
      loanBooks,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

router.get('/:id', authentication, async (req, res) => {
  try {
    const { id } = req.params;

    const loanBook = await getLoanBookById(id);

    if (book.length === 0) {
      return res.status(404).send({
        message: 'loanBook not found',
      });
    }

    res.status(200).send({
      loanBook,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

router.post('/', authentication, async (req, res) => {
  try {
    const { bookIsbn, readerId } = req.body;
    let deliverDate = '';

    if (typeof bookIsbn === 'undefined' || typeof readerId === 'undefined') {
      return res.status(400).send({
        message: 'bookIsbn or readerId is required.',
      });
    }

    const foundBook = getBookByISBN(bookIsbn);

    if (foundBook.length > 0) {
      if (foundBook[0].status === 'borrowed') {
        return res.status(200).send({
          message: 'The book is on loan',
        });
      }
    }

    const palindrome = palindromeChecker(bookIsbn);

    if (palindrome) {
      return res.status(200).send({
        message: 'palindrome books can only be used in the library',
      });
    }

    const loanBook = {
      loanDate: new Date(),
      deliverDate,
      bookIsbn,
      readerId,
    };

    const response = await createLoanBook(loanBook);
    if (response !== 0) {
      res.status(200).send({
        message: 'loanBook create success',
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

router.put('/:id', authentication, async (req, res) => {
  try {
    const { id } = req.params;
    const loanBook = req.body;

    const response = await updateLoanBook(id, loanBook);

    if (response === 0) {
      return res.status(404).send({
        message: 'loanBook not found',
      });
    }

    res.status(200).send({
      message: 'success',
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

router.delete('/:id', authentication, async (req, res) => {
  try {
    const { id } = req.params;

    const response = await deleteLoanBook(id);

    if (response === 0) {
      return res.status(404).send({
        message: 'book not found',
      });
    }

    res.status(200).send({
      message: 'success',
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

module.exports = router;
