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
app.get('/api/loans', async (req, res) => {
    // Busco listar todos los prestamos
    const loans = await prisma.loans.findMany({
        include: { book: true },        // creo que no lo utilizaremos
    });
    res.json(loans);
});

app.get('/api/loans/:id', async (req, res) => {
    // Busco listar solo un prestamo
    const loan = await prisma.loans.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
        include: { book: true },        // creo que no lo utilizaremos
    });
    if (loan === null) {
        res.sendStatus(404);
        return;
    }
    res.json(loan);
});

app.post('/api/loans', async (req, res) => {
    // Crea nuevo prestamo
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

app.patch('/api/loans/:id', async (req, res) => {
    // Actualiza un prestamo por medio del ID
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

app.delete('/api/loans/:id', async (req, res) => {
    // Borra un autor en especifico
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
