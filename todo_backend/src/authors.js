import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const PORT = process.env.BACKEND_PORT ?? 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
app.options('*', cors());

//  ------- ENDPOINTS --------
app.get('/api/authors', async (req, res) => {
    // Busco listar todos los autores
    const authors = await prisma.author.findMany({
        include: { books: true },       // creo que no lo utilizaremos
    });
    res.json(authors);
});

app.get('/api/authors/:id', async (req, res) => {
    // Busco listar solo un autor
    const author = await prisma.author.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
        include: { books: true },       // creo que no lo utilizaremos
    });
    if (author === null) {
        res.sendStatus(404);
        return;
    }
    res.json(author);
});

app.post('/api/authors', async (req, res) => {
    // Crea nuevo autor
    const author = await prisma.author.create({
        data: {
            name: req.body.name ?? 'Desconocido',
            nationality: req.body.nationality ?? 'Desconocida',
            born_date: req.body.born_date ?? new Date(),   // hay que cambiarlo luego
            biography: req.body.biography ?? 'Sin información',
            stock_books: req.body.stock_books ?? 0,
        },
    });
    res.status(201).json(author);
});

app.patch('/api/authors/:id', async (req, res) => {
    // Actualiza un autor por medio del ID
    let author = await prisma.author.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (author === null) {
        res.sendStatus(404);
        return;
    }

    author = await prisma.author.update({
        where: {
            id: author.id,
        },
        data: {
            name: req.body.name,
            nationality: req.body.nationality,
            born_date: req.body.born_date,
            biography: req.body.biography,
            stock_books: req.body.stock_books,
        },
    });

    res.json(author);
});

app.delete('/api/authors/:id', async (req, res) => {
    // Borra un autor en especifico
    const author = await prisma.author.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (author === null) {
        res.sendStatus(404);
        return;
    }

    await prisma.author.delete({
        where: {
            id: author.id,
        },
    });

    res.json(author);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
