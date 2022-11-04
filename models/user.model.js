const {Model, DataTypes} = require("sequelize");
const db = require("../db/db");

class User extends Model {};

User.init({
    id: {
        type: DataTypes.TEXT,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT
    }
}, {sequelize: db});

module.exports = User;
