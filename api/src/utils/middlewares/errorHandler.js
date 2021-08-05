function errorHandler(err, req, res, next) {
  //constrol de errores
  const status = err.status || 500;
  const message = err.message || err;
  console.log(err);
  return res.status(status).send(message);
}

module.exports = errorHandler;
