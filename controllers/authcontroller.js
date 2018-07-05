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
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err.message))
})

// * POST ITEMS FOR INDIVIDUAL USER

router.post("/", (req, res) => {
    var userId = req.user.id // req.user.id comes from validate-sessions middleware

    AuthModel
        .create({
            item: req.body.expenses.item,
            cost: req.body.expenses.cost,
            paymentMethod: req.body.expenses.paymentMethod,
            dueDate: req.body.expenses.dueDate,
            paid: req.body.expenses.paid,
            owner: userId
        })
        .then(data => {
            res.json({ data: data })
        })
        .catch(err => res.status(500).send(err.message))
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
        .catch(err => res.status(500).send(err.message))
})

// Update specific item using that items PK id

router.put("/", (req, res) => {

    AuthModel
        .update({
            item: req.body.expenses.item,
            cost: req.body.expenses.cost,
            paymentMethod: req.body.expenses.paymentMethod,
            dueDate: req.body.expenses.dueDate,
            paid: req.body.expenses.paid,
        },
            {
                where: {
                    id: req.body.expenses.id
                }
            }
        )
        .then(data => res.json({ expenses: data }))
        .catch(err => res.status(500).send(err.message))
})

module.exports = router