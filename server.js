const express = require("express")
const app = express()
const db = require("./app/models/index.js")
const port = 3000
const jwt = require("node.jwt")
const secret = jwt.secret("blog0023")

app.use(express.json())

const usuarioController = require("./app/controllers/Usuario.controller.js")
const postController = require("./app/controllers/Post.controller.js")
const { json } = require("sequelize")



app.listen(port, async() => {
    await db.conexion.sync()
    console.log("Servidor ejecutando Puerto:" +port);
})

let conectado

app.use((request, response, next)=> {
    if(request.url.startsWith("/posts")) {
        const token = request.headers.authorization
        const dataUsuario = jwt.decode(token,secret)
        if(dataUsuario.code !== '000') {
            return response.status(403).json({success: false, message: "Token invalido" })
        }
        conectado = dataUsuario.payload
        return next();
    }
    next();
})

//Listado de usuarios
app.get("/usuarios", async(request, response) => {
    try {
        const usuarios = await usuarioController.listarUsuarios()
        const retorno = JSON.parse(JSON.stringify(usuarios))
        response.json({success: true, message: "Listado de usuarios", data: usuarios})
        } catch (error) {
    response.status(400).json({success: false, message: "Error en listado de usuarios"})
    }
})

//Mostrar usuario especifico
app.get("/usuarios/:id", async (request, response)=> {
    try {
        const id = request.params.id
        const usuario = await usuarioController.mostrarUsuario(id)
        response.json({success: true, message: "Mostrar usuarios", data: usuario})
    } catch (error) {
        response.status(400).json({success: false, message: error})
    }
   
})

// Registro de usuarios
app.post("/usuarios", async(request, response)=> {
    try {
        const registro = await usuarioController.crearUsuario(request.body)
        const retorno = JSON.parse(JSON.stringify(registro))
        response.json({success: true, message:"Registro de usuarios", data:retorno})
    } catch (error) {
        response.status(400).json({success:false, message: error.message})
    }
})

//Actualización de usuarios
app.put("/usuarios/:id", async(request, response)=> {
    try {
        const id = request.params.id
        const actualizacion = await usuarioController.actualizarUsuario(id, request.body)
        response.json({success:true, message:"Actualización de usuarios", data: actualizacion})
    } catch (error) {
        response.status(400).json({success:false, message: error})
    }
})

//Eliminación de usuarios
app.delete("/usuarios/:id", async(request, response)=> {
    try {
        const id = request.params.id
        const eliminacion = await usuarioController.eliminarUsuario(id)
        response.json({success: true, message:"Eliminación de usuarios", data: eliminacion})
    } catch (error) {
        response.status(400).json({success: false, message:error})
    }
})

app.post("/login", async(request, response) => {
    try {
        const token = await usuarioController.login(request.body)
        response.json({success: true, token: token})
    } catch (error) {
        response.status(403).json({success: false, message:error})
    }
})

/* app.use("/posts", (request, response, next)=> {
    if(request.method === 'GET') {
        console.log("Solicitud de listado");
        return response.status(403).json({success: false})
    }
    next()
}) */


//Listado de Posts
app.get("/posts", async(request, response)=> {
    try {
        const listado = await postController.listarPost(conectado.id)
        response.json({success: true, message: "Listado de Posts",data: listado})
    } catch (error) {
        response.status(400).json({success: false, message: "Error en listado de Posts"})
    }
  
})

//Mostrar Posts especifico
app.get("/posts/:id", async(request, response)=> {
    try {
        const id = request.params.id
        const post = await postController.consultarPost(id, conectado.id)
        response.json({success: true, message: "Mostrar Post", data: post})
    } catch (error) {
        response.json({success: false, message: "Error consultando Post"})
    }
    
})

//Registrar Posts
app.post("/posts", async(request, response)=> {
    try {
        const registro = await postController.crearPost(request.body, conectado.id)
        response.json({success: true, message: "Registro de Post", data: registro})
    } catch (error) {
        response.status(400).json({success: false, message: "Error de registro de Post"})
    }
    
})

//Actualizar Posts
app.put("/posts/:id", async(request, response)=> {
    response.json({success: true, message: "Actualización de Posts"})
})

//Eliminar Posts
app.delete("/posts/:id", async(request, response)=> {
    response.json({succes: true, message: "Eliminación de Posts"})
})