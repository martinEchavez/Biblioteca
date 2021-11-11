exports.success = (message, status = 200, data = '') => {
  return {
    message,
    status,
    data,
  };
};

exports.error = (message, status = 500) => {
  return {
    message,
    status,
  };
};
