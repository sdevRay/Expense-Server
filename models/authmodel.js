module.exports = (sequelize, DataTypes) => sequelize.define("expenses", {
    item: DataTypes.STRING,
    owner: DataTypes.INTEGER
})
