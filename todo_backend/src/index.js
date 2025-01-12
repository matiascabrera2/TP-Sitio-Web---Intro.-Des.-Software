import express from 'express' 
// import { pool } from './db.js' //Importa la conexión a la base de datos
// import carreraRoutes from './routes/carreras.routes.js' //Importa las rutas de carrera

const app = express() //Crea una instancia de express
const PORT = process.env.BACKEND_PORT ?? 3000;

// app.use(algo)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

