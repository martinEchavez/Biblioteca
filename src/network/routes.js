const book = require('../components/book/network');
const reader = require('../components/reader/network');
const loanBook = require('../components/loanBook/network');
const auth = require('../components/authentication/network');

const routes = (server) => {
  server.use('/api/book', book);
  server.use('/api/reader', reader);
  server.use('/api/loanBook', loanBook);
  server.use('/api/auth', auth);
};

module.exports = routes;
