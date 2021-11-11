const express = require('express');
const {
  getUsers,
  createUser,
  validateUser,
  deleteUser,
} = require('./controller');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await getUsers();

    res.status(200).send({
      users,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

router.post('/signup', async (req, res) => {
  try {
    let { username, password } = req.body;

    const response = await createUser(username, password);

    res.status(response.status).send({
      response,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  const response = await validateUser(username, password);

  res.status(response.status).send({
    response,
  });
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const response = await deleteUser(id);

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
