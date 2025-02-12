import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const books = await prisma.book.findMany();
    res.json(books);
});

router.get('/:id', async (req, res) => {
    const book = await prisma.book.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (book === null) {
        res.sendStatus(404);
        return;
    }
    res.json(book);
});

router.post('/', async (req, res) => {
    const book = await prisma.book.create({
        data: {
            author_id: req.body.author_id,
            availability: req.body.availability ?? "No disponible",
            stock: req.body.stock ?? 0,
            title: req.body.title ?? "Sin titulo",
            publication_date: req.body.publication_date ?? "Sin fecha",
            genre: req.body.genre ?? "Sin genero",
            language: req.body.language,
            loan_price: req.body.loan_price ?? 0,
        },
    });
    res.status(201).json(book);
});

router.patch('/:id', async (req, res) => {
    let book = await prisma.book.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (book === null) {
        res.sendStatus(404);
        return;
    }

    book = await prisma.book.update({
        where: {
            id: book.id,
        },
        data: {
            author_id: req.body.author_id,
            availability: req.body.availability,
            stock: req.body.stock,
            title: req.body.title,
            publication_date: req.body.publication_date,
            genre: req.body.genre,
            language: req.body.language,
            loan_price: req.body.loan_price,
        },
    });

    res.json(book);
});

router.delete('/:id', async (req, res) => {
    const book = await prisma.book.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (book === null) {
        res.sendStatus(404);
        return;
    }

    await prisma.book.delete({
        where: {
            id: parseInt(req.params.id),
        },
    });

    res.json(book);
});

export default router;