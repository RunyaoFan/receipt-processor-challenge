import express from 'express';
import { receiptsRouter } from './routes/receiptsRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/receipts', receiptsRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});