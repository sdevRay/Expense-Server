var router = require("express").Router()
var sequelize = require("../db")
var PostModel = sequelize.import("../models/postmodel")

// * POST ITEMS FOR INDIVIDUAL USER

router.post("/", (req, res) => {
    var userId = req.user.id // req.user.id comes from validate-sessions middleware

    PostModel
        .create({
            total: req.body.post,
            owner: userId
        })
        .then(data => {
            res.json({ data: data })
        })
        .catch(err => res.status(500).send(err.message))
})

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

// Update specific item using that items PK id

router.put("/", (req, res) => {

    PostModel
        .update({
            total: req.body.post,
        },
            {
                where: {
                    id: req.body.id
                }
            }
        )
        .then(data => res.json({ expenses: data }))
        .catch(err => res.status(500).send(err.message))
})

module.exports = router