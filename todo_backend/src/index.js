import express from 'express';
import cors from 'cors';
import booksRouter from './routes/books.js';
import authorsRouter from './routes/authors.js';
import loansRouter from './routes/loans.js'; // Importar las rutas de préstamos

const app = express();
const PORT = process.env.BACKEND_PORT ?? 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

// Usar las rutas
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/loans', loansRouter); // Usar las rutas de préstamos

app.get('/', (req, res) => {
    res.send('Funca :)');
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});