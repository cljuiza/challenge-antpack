const server =require("./src/app");
const {conn} =require("./src/db");
//const {conn} =require("./src/models/index");

const { PORT } = require("./src/utils/config/index");

// Sincronizando todas las modelos a la vez.
conn.sync({force:false}).then(()=>{
  console.log("base de datos conectada")
  server.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando el puerto ${PORT}`)
  })
})
