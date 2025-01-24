import express from 'express';
import { PrismaClient } from '@prisma/client';



const app = express()
const PORT = process.env.BACKEND_PORT ?? 3000;

const prisma = new PrismaClient();

app.use(express.json());



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

