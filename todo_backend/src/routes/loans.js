import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

//  ------- ENDPOINTS --------
router.get('/', async (req, res) => {
    // Busco listar todos los préstamos
    const loans = await prisma.loans.findMany({
        include: { book: true }, // Incluir datos del libro (opcional)
    });
    res.json(loans);
});

router.get('/:id', async (req, res) => {
    // Busco listar solo un préstamo
    const loan = await prisma.loans.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
        include: { book: true }, // Incluir datos del libro (opcional)
    });
    if (loan === null) {
        res.sendStatus(404);
        return;
    }
    res.json(loan);
});

router.post('/', async (req, res) => {
    try {
        // Obtener el libro para verificar el stock
        const book = await prisma.book.findUnique({
            where: { id: req.body.book_id },
            select: { stock: true }
        });

        if (!book) {
            return res.status(404).json({ error: "Libro no encontrado" });
        }

        if (book.stock <= 0) {
            return res.status(400).json({ error: "No hay stock disponible para este libro" });
        }

        const loan = await prisma.loans.create({
            data: {
                book_id: req.body.book_id,
                price: req.body.price ?? 0,
                reader: req.body.reader ?? 'Desconocido',
                loan_date: req.body.loan_date ?? "Sin fecha",
                return_date: req.body.return_date ?? "Sin fecha",
            },
        });

        // Reduce en 1 el stock del libro prestado
        await prisma.book.update({
            where: { id: req.body.book_id },
            data: { stock: { decrement: 1 } },
        });

        res.status(201).json(loan);
    } catch (error) {
        console.error("Error al crear el préstamo:", error);
        res.status(500).json({ error: "Error al crear el préstamo" });
    }
});


router.patch('/:id', async (req, res) => {
    // Actualiza un préstamo por medio del ID
    let loan = await prisma.loans.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (loan === null) {
        res.sendStatus(404);
        return;
    }

    loan = await prisma.loans.update({
        where: {
            id: loan.id,
        },
        data: {
            book_id: req.body.book_id,
            price: req.body.price,
            reader: req.body.reader,
            loan_date: req.body.loan_date,
            return_date: req.body.return_date,
        },
    });

    res.json(loan);
});

router.delete('/:id', async (req, res) => {
    try {
        // Buscar el préstamo antes de eliminarlo para obtener el book_id
        const loan = await prisma.loans.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });

        if (!loan) {
            return res.status(404).json({ error: "Préstamo no encontrado" });
        }

        await prisma.loans.delete({
            where: { id: loan.id },
        });

        // Aumentar en 1 el stock del libro devuelto
        await prisma.book.update({
            where: { id: loan.book_id },
            data: { stock: { increment: 1 } },
        });

        res.json({ message: "Préstamo eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el préstamo:", error);
        res.status(500).json({ error: "Error al eliminar el préstamo" });
    }
});

export default router;