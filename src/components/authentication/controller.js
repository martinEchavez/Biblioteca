const jwt = require('jsonwebtoken');
require('dotenv').config();
const { encryptPassword, comparePassword } = require('../../helpers/bcrypt');
const { get, add, getUserByUsername, remove } = require('./store');

const getUsers = () => {
  return get();
};

const createUser = async (username, password) => {
  if (typeof username === 'undefined' || typeof password === 'undefined') {
    return {
      message: 'user or password is required.',
      status: 401,
      auth: false,
      token: null,
    };
  }
  password = await encryptPassword(password);
  const user = {
    username,
    password,
  };

  const response = add(user);
  if (response !== 0) {
    const token = await jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
      expiresIn: '2h',
    });
    return {
      message: 'user created',
      status: 200,
      auth: true,
      token,
    };
  }
};

const validateUser = async (username, password) => {
  const user = await getUserByUsername(username);
  if (user.length === 0) {
    return {
      message: 'incorrect username or password',
      status: 401,
      auth: false,
      token: null,
    };
  }
  const validatePassword = await comparePassword(password, user[0].password);

  if (!validatePassword) {
    return {
      message: 'incorrect username or password',
      status: 401,
      auth: false,
      token: null,
    };
  }

  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '2h',
    }
  );

  return {
    message: 'singnin success',
    status: 200,
    auth: true,
    token,
  };
};

const deleteUser = async (id) => {
  const response = await remove(id);
  if (response === 0) {
    return {
      message: 'player not found',
      status: 404,
    };
  }
  return {
    message: 'player deleted',
    status: 200,
  };
};

module.exports = {
  getUsers,
  createUser,
  validateUser,
  deleteUser,
};
