module.exports = (sequelize, DataTypes) => sequelize.define("userTable", { // .define() is a Sequelize method that will map model properties in the server file to a table in Postgres. 
    //  key in our model object that will be a column in our database

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    passwordhash: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

