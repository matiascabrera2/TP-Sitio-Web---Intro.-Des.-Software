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

//  COMO AXIOS MANEJA AUTOMATICAMENTE LOS CASOS UNDEFINED, o sea, no los utiliza, realmente
//  patch o put, vienen a ser la misma cosa, por como se maneja axios mas que nada
app.patch('/api/books/:id', async (req, res) => {
    let author = await prisma.author.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (author === null) {
        res.sendStatus(404);
        return;
    }

    author = await prisma.author.update({
        where: {
            id: author.id
        },
        data: {
            name: req.body.name,
            nationality: req.body.nationality,
            born_date: req.body.born_date,    
            biography: req.body.biography,
            stock_books: req.body.stock_books
        }
    })

    res.send(author);
})

app.delete('/api/books/:id', async (req, res) => {
    // Borrar un libro en especifico
    const author = await prisma.author.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (author === null) {
        res.sendStatus(404);
        return;
    } 

    await prisma.author.delete({
        where: {
            id: parseInt(req.params.id)
        }
    }) 

    res.send(author); 
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

