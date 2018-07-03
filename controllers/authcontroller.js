var router = require("express").Router()
var sequelize = require("../db")
// var UserModel = sequelize.import("../models/usermodel")
var AuthModel = sequelize.import("../models/authmodel")

// * GET ALL ITEMS FOR AN INDIVIDUAL USER

router.get("/", (req, res) => {
    var userId = req.user.id // req.user.id comes from validate-sessions middleware

    AuthModel
        .findAll({
            where: {
                owner: userId
            }
        })
        // .then(data => res.json(data)) // WHAT THE FUCK??
        .then(function onSuccess(data){
            res.json(data)
        })
        .catch(err => res.send(500, err.message))
})

// * POST ITEMS FOR INDIVIDUAL USER

router.post("/", (req, res) => {
    var userId = req.user.id // req.user.id comes from validate-sessions middleware

    AuthModel
        .create({
            item: req.body.expenses.item,
            owner: userId
        })
        .then(data => {
            res.json({ data: data })
        })
        .catch(err => res.send(500, err.message))
})

// Delete specific item using that items PK id

router.delete("/", (req, res) => {

    AuthModel
        .destroy({
            where: {
                id: req.body.expenses.id
            }
        })
        .then(data => res.send("Item removed"))
        .catch(err => res.send(500, err.message))
})

// Update specific item using that items PK id

router.put("/", (req, res) => {

    AuthModel
        .update({
            item: req.body.expenses.item
        },
            {
                where: {
                    id: req.body.expenses.id
                }
            }
        )
        .then(data => res.json({ expenses: data }))
        .catch(err => res.send(500, err.message))
})

module.exports = router