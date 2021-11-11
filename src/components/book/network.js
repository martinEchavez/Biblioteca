const express = require('express');
const { authentication } = require('../../middleware/authentication');
const {
  getBooks,
  createBock,
  updateBook,
  getBookByISBN,
  deleteBook,
} = require('./controller');

const router = express.Router();

router.get('/', authentication, async (req, res) => {
  try {
    const books = await getBooks();

    res.status(200).send({
      books,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

router.get('/:isbn', authentication, async (req, res) => {
  try {
    const { isbn } = req.params;

    const response = await getBookByISBN(isbn);

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
    const { isbn, name, author, status } = req.body;

    const response = await createBock(isbn, name, author, status);

    res.status(response.status).send({
      response,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

router.put('/:isbn', authentication, async (req, res) => {
  try {
    const { isbn } = req.params;
    const book = req.body;

    const response = await updateBook(isbn, book);

    res.status(response.status).send({
      response,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

router.delete('/:isbn', authentication, async (req, res) => {
  try {
    const { isbn } = req.params;

    const response = await deleteBook(isbn);

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
