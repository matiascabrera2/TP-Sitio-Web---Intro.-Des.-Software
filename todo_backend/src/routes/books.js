import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
      const books = await prisma.book.findMany({
        include: {
          author: true,
        },
      });
      console.log('Obteniendo libros:', books);
      res.json(books);
    } catch (error) {
      console.error('Error al obtener libros:', error);
      res.status(500).json({ error: 'Error al obtener libros' });
    }
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
    try {
        const book = await prisma.book.create({
            data: {
                author_id,
                availability,
                stock,
                title,
                publication_date,
                genre,
                language,
                // Prisma Decimal puede recibir un número o un string
                loan_price: loan_price 
              },
            include: {
                author: true, // Esto traerá los datos del autor al devolver el libro
            }
        });
        res.status(201).json(book);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Error al crear el libro' });
    }
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