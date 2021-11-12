const { palindromeChecker, fnEndDate, sumDigitIsbn } = require('./utilDate');

describe('File utilDate', () => {
  test('should return true for a palindrome number', () => {
    const expected = palindromeChecker(1221);
    expect(expected).toBeTruthy();
  });

  test('should return false if the number is not a palindrome', () => {
    const expected = palindromeChecker(124521);
    expect(expected).toBeFalsy();
  });

  test('should return the sum of the ISBN digits', () => {
    const expected = sumDigitIsbn(5421);
    expect(expected).toBe(12);
  });
});
