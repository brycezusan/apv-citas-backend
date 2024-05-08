import conexionDB from "./config/db.js"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import veterinarioRoutes from "./router/veterinarioRoutes.js"
import pacienteRoutes from "./router/pacienteRoutes.js"


// Instancia de express
const app = express()
//Hablilitar respuestas json
app.use(express.json())
//Instancia de dotenv
dotenv.config()
//conexion de db
conexionDB()

//config CORS
const dominiosPermitidos = ["http://localhost:5173"];

const corsOptions={
  origin:function(origin, callback){
    if(dominiosPermitidos.indexOf(origin) !== -1){
      // origen permitido
      callback(null , true)
    }else{
      callback(new Error ('No permitido por CORS'))
    }
  }
}

app.use(cors(corsOptions))

// Definicion de puerto del server
const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})

// Routes
app.use("/api/veterinarios",veterinarioRoutes)
app.use("/api/pacientes",pacienteRoutes)
