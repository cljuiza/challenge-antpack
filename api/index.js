//express, secuelize, pg, morgan
const express = require("express");
const morgan = require("morgan");
const PORT = 3000;
const app = express();

//seteo todos los headers
app.use(express.urlencoded({ extended: true, limit: "50mb" })); //parcea el json en forma correcta
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev")); //da un output en la consola para ver los request
//
app.use((req, res, next) => {
  //seteamos los headers
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //escuche al dominio de frontend
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-Content-Type,Accept"); //acepte este tipo de headers
  res.header("Access-Control-Allow-Methods","GET,POST,OPTIONS,PUT,DELETE");
  next();//continue
});
//seteamos nuestras rutas
app.get("/", (req, res) => {
  res.send("hola");
});
//middleware de constrol de errores

//server.listen

app.listen(PORT, () => {
  console.log(`El servidor esta escuchando en el puerto ${PORT}`);
});
