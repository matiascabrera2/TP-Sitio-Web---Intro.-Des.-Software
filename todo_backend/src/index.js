import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express()
const PORT = process.env.BACKEND_PORT ?? 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
app.options('*', cors());

//  ------- ENDPOINTS --------
app.get('/api/books',  async (req, res) => {
    // Busco listar todos los libros
    const books = await prisma.book.findMany()
    res.json(books)
})

app.get('/api/books/:id', async (req, res) => {
    // Busco listar solo un libro
    const book = await prisma.book.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    }) 
    if (book === null){
        res.sendStatus(404)
        return
    }
    res.json(book)
})

app.post('/api/books', async (req, res) =>{
    // Agrega nuevo libro
    const book = await prisma.book.create({
        data: {
            author_id: req.body.author_id,
            availability: req.body.availability ?? "No disponible",
            stock: req.body.stock ?? 0,
            title: req.body.title ?? "Sin titulo",
            publication_date: req.body.publication_date ?? "Sin fecha",
            genre: req.body.genre ?? "Sin genero",
            language: req.body.language,
            loan_price: req.body.loan_price ?? 0
        }
    })
    res.status(201).send(book)
})

//  COMO PRISMA MANEJA AUTOMATICAMENTE LOS CASOS UNDEFINED, o sea, no los utiliza, realmente
//  patch o put, vienen a ser la misma cosa, por como se maneja axios mas que nada
app.patch('/api/books/:id', async (req, res) => {
    let book = await prisma.book.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (book === null) {
        res.sendStatus(404);
        return;
    }

    book = await prisma.book.update({
        where: {
            id: book.id
        },
        data: {
            author_id: req.body.author_id,
            availability: req.body.availability,
            stock: req.body.stock,
            title: req.body.title,
            publication_date: req.body.publication_date,
            genre: req.body.genre,
            language: req.body.language,
            loan_price: req.body.loan_price
        }
    })

    res.send(book);
})

app.delete('/api/books/:id', async (req, res) => {
    // Borrar un libro en especifico
    const book = await prisma.book.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if (book === null) {
        res.sendStatus(404);
        return;
    } 

    await prisma.book.delete({
        where: {
            id: parseInt(req.params.id)
        }
    }) 

    res.send(book); 
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

