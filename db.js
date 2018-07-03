// Sequelize Connection
const Sequelize = require("sequelize")
const sequelize = new Sequelize(process.env.DBNAME, process.env.PGUSER, process.env.PGPASS, {
    host: process.env.PGHOST,
    dialect: "postgres",
    port: 5432
})

sequelize.authenticate()
.then(() => console.log("CONNTECTED TO POSTGRES DATABASE -> 'PERN'"))
.catch((err) => console.log(err))

module.exports = sequelize