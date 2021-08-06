const { Sequelize } = require("sequelize");
const {dbUser,dbName,dbPort,dbHost,dbPasword}=require("../src/utils/config/index")
const UserFactory=require("../src/models/User")

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPasword}@${dbHost}/${dbName}`, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const User=UserFactory(sequelize);

module.exports={
    //conexion
    conn:sequelize,
    //modelos
    User,
}

