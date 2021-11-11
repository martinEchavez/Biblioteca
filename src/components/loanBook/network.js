const express = require('express');
const { authentication } = require('../../middleware/authentication');

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
    const response = await getLoanBooks();

    res.status(response.status).send({
      response,
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

    const response = await getLoanBookById(id);

    res.status(response.status).send({
      response,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

router.post('/', authentication, async (req, res) => {
  try {
    const { bookIsbn, readerName } = req.body;

    const response = await createLoanBook(bookIsbn, readerName);

    res.status(response.status).send({
      response,
    });
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

    res.status(response.status).send({
      response,
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

    res.status(response.status).send({
      response,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

module.exports = router;
