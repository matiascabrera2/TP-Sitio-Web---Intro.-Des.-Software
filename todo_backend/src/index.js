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
app.get('/api/books',  async (req, res) => {
    // Busco listar todo
    const authors = await prisma.author.findMany()
    res.json(authors)
})

app.get('/api/books/:id', async (req, res) => {
    // Busco listar solo un libro
    const author = await prisma.author.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    }) 
    if (author === null){
        res.sendStatus(404)
        return
    }
    res.json(author)
})

app.post('/api/books', async (req, res) =>{
    // Agrega nuevo libro/autore
    const author = await prisma.author.create({
        data: {
            name: req.body.name,
            nationality: req.body.nationality,
            born_date: req.body.born_date,    // ACA TENGO QUE HACERLO CON UN COMANDO SEGURAMENTE 
            biography: req.body.biography,
            stock_books: req.body.stock_books
        }
    })
    res.status(201).send(author)
})

app.put('/api/books/:id', async (req, res) => {
    // actualiza reescribiendo todos los datos de un libro

})

app.put('/api/books/:id', async (req, res) => {
    // actualiza parcialmente, reescribiendo los datos ingresados de un libro

})

app.delete('/api/books/:id', async (req, res) => {
    // Borrar un libro en especifico
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

