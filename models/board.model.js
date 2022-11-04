const {Model, DataTypes} = require("sequelize");
const db = require("../db/db");

class Board extends Model {};

Board.init({
    id: {
        type: DataTypes.TEXT,
        primaryKey: true
    },
    type: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    rating: {
        type: DataTypes.REAL
    }
}, {sequelize: db});

module.exports = Board;
