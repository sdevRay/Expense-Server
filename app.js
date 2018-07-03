require("dotenv").config() // dotenv provides a way to allow you to create secret keys that your application needs to function and keep them from going public.

// EXPRESS
var express = require("express")
var app = express()

// SEQUELIZE
var sequelize = require("./db")
sequelize.sync() // PASS IN { force: true } FOR RESETTING TABLES 
var bodyParser = require("body-parser")
app.use(bodyParser.json())

// * EXPOSED ROUTE
app.use(require("./middleware/headers"))
app.use("/api/user", require("./controllers/usercontroller"))

// * PROTECTED ROUTES
app.use(require("./middleware/validate-session"))
app.use("/api/expenses", require("./controllers/authcontroller"))

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}`)) // use express to start a UNIX socket and listen for connections on the given path
