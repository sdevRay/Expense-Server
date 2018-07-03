
var router = require("express").Router()
var sequelize = require("../db")
var UserModel = sequelize.import("../models/usermodel")
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")

// CREATE BASIC USER
// When we create a user, the server will also create a token to send to the client. The server sends the token back to the client in the response.

router.post("/signup", (req, res) => {

    UserModel.create({ username: req.body.user.username, passwordhash: bcrypt.hashSync(req.body.user.password, 10) }) // PASSWORD ENCRYPTION 
        .then(returnedUser => {
            let token = jwt.sign({ id: returnedUser.id }, process.env.JWT_SIGNATURE, { expiresIn: 60 * 60 * 24 }) // TOKEN CREATION
            // process.env.JWT_SIGNATURE The system goes outside the current file to the .env file, where it looks for something called JWT_SIGNATURE. The value of the secret is stored in that environment variable.

            // .sign() creates the token. It takes at least 2 parameters: the payload and the signature. You can also supply some specific options or a callback. 
            res.json({ user: returnedUser, message: "Created", sessionToken: token }) // BUNDLE returnedUser INTO AN OBJECT CALLED USER
        })
        .catch(err => res.send(500, err.message))
})

router.post("/login", (req, res) => {
    UserModel.findOne({ where: { username: req.body.user.username } }) // findOne() method is a Sequelize method that does exactly what it says: it tries to find something within the database that we tell it to look for. This is called Data Retrieval.
        .then(returnedUser => {
            if (returnedUser) {
                bcrypt.compare(req.body.user.password, returnedUser.passwordhash, (err, matches) => {
                    if (matches) {
                        let token = jwt.sign({ id: returnedUser.id }, process.env.JWT_SIGNATURE, { expiresIn: 60 * 60 * 24 })
                        res.json({ user: returnedUser, message: "password authenticated", sessionToken: token })
                    } else {
                        res.status(502).send({ error: "password failed authentication" })

                    }
                })
            } else {
                res.status(500).send({ error: "user does not exist" })
            }
        })
        .catch(err => res.send(501, err.message))
})

module.exports = router