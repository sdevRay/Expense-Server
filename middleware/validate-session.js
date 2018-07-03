var jwt = require("jsonwebtoken")
var sequelize = require("../db")
var UserModel = sequelize.import("../models/usermodel")

module.exports = (req, res, next) => {
    if (req.method == "OPTIONS") {
        next()
    } else {
        let sessionToken = req.headers.authorization // sessionToken is created to hold the token, which is pulled from the authorization header of the request coming in.
        if (!sessionToken) { // If no token is present, the 403 Forbidden error is returned as the response.
            return res.status(403).send({
                auth: false,
                message: "No Token"
            })
        } else { // no user property is ever provided in the request, so only tokens will get checked. This prevents unauthorized use of a token that was assigned to a different user.
            jwt.verify(sessionToken, process.env.JWT_SIGNATURE, (err, decoded) => {
                if (decoded) {
                    UserModel.findOne(
                        { where: { id: decoded.id } }
                    ) // the Sequelize findOne method looks for an id in the users table that matches the decoded.id property
                        .then(user => { // The callback sets the user value for the request as the id value passed to it then sends the request on to its next destination. 
                            req.user = user
                            next()
                        })
                        .catch(err => res.send(err))
                } else {
                    res.status(400).send({ error: "Not Authorized" })
                }
            })
        }
    }
}