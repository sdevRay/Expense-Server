module.exports = (sequelize, DataTypes) => sequelize.define("userTable", {
    username: DataTypes.STRING, //  key in our model object that will be a column in our database
    passwordhash: DataTypes.STRING
})

// .define() is a Sequelize method that will map model properties in the server file to a table in Postgres. 
