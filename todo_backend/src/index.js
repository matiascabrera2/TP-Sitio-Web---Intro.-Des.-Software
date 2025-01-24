import express from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';      // Manejo de peticiones http, mas facil


const app = express()
const PORT = process.env.BACKEND_PORT ?? 3000;

const prisma = new PrismaClient();

app.use(express.json());

// ------- HOME ---------
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://frontend:80/index.html');
        res.send(response.data);
    } catch (error) {
        console.error('Se produjo un error:', error);
        res.status(404).send('No se pudo obtener la página');
    }
});

//  ------- ENDPOINTS --------
app.get('/api/libros',  async (req, res) => {
    // Busco listar todo
    const authors = await prisma.author.findMany()
    res.json(authors)
})

app.get('/api/libros/:id', async (req, res) => {
    // Busco listar solo un libro
})

app.post('/api/books', async (req, res) =>{
    // Agrega nuevo libro/autore

})

app.put('/api/libros/:id', async (req, res) => {
    // actualiza reescribiendo todos los datos de un libro

})

app.put('/api/libros/:id', async (req, res) => {
    // actualiza parcialmente, reescribiendo los datos ingresados de un libro

})

app.delete('/api/libros/:id', async (req, res) => {
    // Borrar un libro en especifico
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

