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
    // Crea nuevo préstamo
    const loan = await prisma.loans.create({
        data: {
            book_id: req.body.book_id,
            price: req.body.price ?? 0,
            reader: req.body.reader ?? 'Desconocido',
            loan_date: req.body.loan_date ?? new Date(),
            return_date: req.body.return_date ?? new Date(),
        },
    });
    res.status(201).json(loan);
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
    // Borra un préstamo en específico
    const loan = await prisma.loans.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (loan === null) {
        res.sendStatus(404);
        return;
    }

    await prisma.loans.delete({
        where: {
            id: loan.id,
        },
    });

    res.json(loan);
});

export default router;