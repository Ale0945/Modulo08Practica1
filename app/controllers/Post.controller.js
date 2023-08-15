const db = require("./../models/index")
const { posts } = db

exports.crearPost = async(datosPost, idUsuario)=>{
    const registro = await posts.create({ ...datosPost, usuario_id: idUsuario})
    return registro;
}
exports.listarPost = async(idUsuario)=> {
    const listado = await posts.findAll({where: {usuario_id: idUsuario}})
    return listado
}

exports.consultarPost = async(idPost, idUsuario)=> {
    const post = await posts.findOne({where: {id: idPost, usuario_id: idUsuario}})
    return post
}
