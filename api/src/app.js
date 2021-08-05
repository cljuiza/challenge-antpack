//express, secuelize, pg, morgan
const express = require("express");
const cookieParser = require("cookie-parser");

const morgan = require("morgan");
const routes = require("./routes/index");

const errorHandler = require("./utils/middlewares/errorHandler");
const setHeaders = require("./utils/middlewares/setHeaders");
//require("./db");

const server = express();
server.name = "API";

//seteo todos los headers
server.use(express.urlencoded({ extended: true, limit: "50mb" })); //parcea el json en forma correcta
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev")); //da un output en la consola para ver los request
server.use(setHeaders);
//seteamos nuestras rutas
server.use("/", routes);

//middleware de constrol de errores
//funcion que se ejecutara luego del next
server.use(errorHandler);

module.exports=server;

