function setHeaders(req, res, next) {
  //seteamos los headers
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //escuche al dominio de frontend
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Content-Type,Accept"
  ); //acepte este tipo de headers
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
  next(); //continue
}
module.exports=setHeaders;