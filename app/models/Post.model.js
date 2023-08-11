const Sequelize = require("sequelize")
const conexion = require("./../config/Conexion.config")
const Post = conexion.define("posts", {
    titulo: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    cuerpo: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})
module.exports = Post