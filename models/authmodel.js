module.exports = (sequelize, DataTypes) => sequelize.define("expenses", {
    item: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.STRING
    },
    dueDate: {
        type: DataTypes.STRING
    },
    paid: {
        type: DataTypes.STRING,
    },
    owner: {
        type: DataTypes.INTEGER
    }
})
