import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const authors = await prisma.author.findMany({
        include: { books: true },
    });
    res.json(authors);
});

router.get('/:id', async (req, res) => {
    const author = await prisma.author.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
        include: { books: true },
    });
    if (author === null) {
        res.sendStatus(404);
        return;
    }
    res.json(author);
});

router.post('/', async (req, res) => {
    const author = await prisma.author.create({
        data: {
            name: req.body.name ?? 'Desconocido',
            nationality: req.body.nationality ?? 'Desconocida',
            born_date: req.body.born_date ?? '2000-01-01T00:00:00Z',
            biography: req.body.biography ?? 'Sin información',
            stock_books: req.body.stock_books ?? 0,
        },
    });
    res.status(201).json(author);
});

router.patch('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

export default router;