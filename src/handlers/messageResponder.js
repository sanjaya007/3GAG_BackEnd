const respond = (res, code, status, key, message) => {
  res.status(code).json({
    status,
    key,
    message,
  });
};

module.exports = respond;
