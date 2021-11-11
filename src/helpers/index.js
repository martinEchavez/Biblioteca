const bcrypt = require('bcryptjs');

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, passEncrypt) => {
  return await bcrypt.compare(password, passEncrypt);
};

const palindromeChecker = (isbn) => {
  const isbnReversed = isbn.toString().split('').reverse().join('');
  return isbnReversed === isbn.toString() ? true : false;
};

const fnEndDate = () => {
  const endDate = addDays(new Date(), 15);
  const sunday = sundayAccount(new Date(), endDate);
  const fianalDay = addDays(new Date(), 15 + sunday);
  if (fianalDay.getDay() === 0) {
    return addDays(fianalDay, 1);
  }
  return fianalDay;
};

const sundayAccount = (startDate, endDate) => {
  let countSunday = 0; // count sunday

  for (var i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
    if (i.getDay() === 0) {
      countSunday++;
    }
  }
  return countSunday;
};

const addDays = (date, day) => {
  date.setDate(date.getDate() + day);
  return date;
};

const sumDigitIsbn = (isbn) => {
  let sum = 0;
  isbn
    .toString()
    .split('')
    .forEach((digit) => (sum += parseInt(digit)));
  return sum;
};

module.exports = {
  encryptPassword,
  comparePassword,
  palindromeChecker,
  fnEndDate,
  sumDigitIsbn,
};
