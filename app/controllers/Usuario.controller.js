const db = require("./../models/index")
const {usuarios} = db
const jwt = require("node.jwt")

const secret = jwt.secret("blog0023")

exports.crearUsuario = async(datosUsuario)=> {
    const registro = await usuarios.create(datosUsuario)
    return registro
}

exports.mostrarUsuario = async (id) => {
    const usuario = await usuarios.findOne({ where: { id: id}})
    if(!usuario) {
        throw "Id de usuario no registrado"
    }
    return usuario
}

exports.listarUsuarios = async() => {
    const listado = await db.usuarios.findAll()
    return listado
}

exports.actualizarUsuario = async(id, datosUsuario)=> {
    const usuario = await usuarios.findByPk(id)
    if(!usuario) {
        throw "Id de usuario no registrado"
    }
    const actualizacion = await usuario.update(datosUsuario)
    return actualizacion
}

exports.eliminarUsuario = async (id) => {
    const usuario = await usuarios.findByPk(id)
    if(!usuario) {
        throw "Id de usuario no registrado"
    }
    await usuario.destroy()
    return usuario
}

exports.login = async (datosUsuario) => {
    const usuario = await usuarios.findOne({where: {usuario: datosUsuario.usuario, contrasena: datosUsuario.contrasena}})
    if(!usuario) {
        throw "Usuario y/o contraseña incorrectos"
}
    const token = jwt.encode(usuario, secret)
    return token
}