const conexion = require("./../config/Conexion.config.js")

const db = {
    conexion,
    usuarios: require("./Usuario.model.js"),
    posts: require("./Post.model.js")

}

db.usuarios.hasMany(db.posts, {
    as: "posts",
    foreignKey: "usuario_id"
})
db.posts.belongsTo(db.usuarios,{
    as: "usuario",
    foreignKey: "usuario_id"
})
module.exports = db