const express = require('express');
const { authentication } = require('../../middleware/authentication');
const {
  getReaders,
  createReader,
  updateReader,
  getReaderById,
  deleteReader,
} = require('./controller');

const router = express.Router();

router.get('/', authentication, async (req, res) => {
  try {
    const response = await getReaders();

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

    const response = await getReaderById(id);

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
    const { name } = req.body;
    const response = await createReader(name);

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
    const reader = req.body;

    const response = await updateReader(id, reader);

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

    const response = await deleteReader(id);

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
