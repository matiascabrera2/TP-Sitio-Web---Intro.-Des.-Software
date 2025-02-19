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
    // Extrae y convierte el id a número
    const id = parseInt(req.params.id, 10);
  
    // Verifica si el id es válido
    if (!id) {
      return res.status(400).json({ error: 'ID no válido' });
    }
  
    try {
      const book = await prisma.book.findUnique({
        where: { id: id },
        include: { author: true }
      });
  
      if (!book) {
        return res.status(404).json({ error: 'Libro no encontrado' });
      }
      res.json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

router.post('/', async (req, res) => {
    try {
      // Desestructuramos los valores del body
      const { author_id, stock, title, publication_date, genre, language} = req.body;
      
      const book = await prisma.book.create({
        data: {
          author_id: parseInt(author_id, 10),
          availability: stock > 0 ? "Disponible" : "No disponible",
          stock: parseInt(stock, 10) ?? 0,
          title: title ?? "Sin título",
          publication_date: publication_date ?? "Sin fecha",
          genre: genre ?? "Sin género",
          language: language ?? "Desconocido",
        },
        include: {
          author: true, // Para incluir los datos del autor en la respuesta
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
            availability: req.body.stock > 0 ? "Disponible" : "No disponible",
            stock: req.body.stock,
            title: req.body.title,
            publication_date: req.body.publication_date,
            genre: req.body.genre,
            language: req.body.language,
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