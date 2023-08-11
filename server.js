const express = require("express")
const app = express()
const db = require("./app/models/index.js")
const port = 3000


app.listen(port, async() => {
    await db.conexion.sync()
    console.log("Servidor ejecutando Puerto:" +port);
})
