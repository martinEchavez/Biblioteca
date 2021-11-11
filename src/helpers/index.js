const bcrypt = require('bcryptjs');

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, passEncrypt) => {
  return await bcrypt.compare(password, passEncrypt);
};

const palindromeChecker = (isbn) => {
  const isbnReversed = isbn.split('').reverse().join('');
  return isbnReversed === isbn ? true : false;
};

module.exports = {
  encryptPassword,
  comparePassword,
  palindromeChecker,
};
