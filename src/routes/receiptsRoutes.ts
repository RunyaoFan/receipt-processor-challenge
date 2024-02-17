import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import PointsService from '../services/pointsService';
import InMemoryMap from '../models/inMemoryMap';
import { validateReceipt } from '../services/validationService';

export const receiptsRouter = express.Router();

const inMemoryMap = new InMemoryMap();
const pointsService = new PointsService(inMemoryMap);

receiptsRouter.post('/process', (req: Request, res: Response) => {
    if (!validateReceipt(req.body)) {
        return res.status(400).json({ message: "The receipt is invalid" });
    }
    const points = pointsService.calculatePoints(req.body);
    const uniqueId = uuidv4();
    pointsService.storePoints(uniqueId, points);
    res.json({ id: uniqueId });
});

receiptsRouter.get('/:id/points', (req: Request, res: Response) => {
    const id = req.params.id;
    const points = pointsService.getPoints(id);
    if (points !== undefined) {
        res.json({ points: points });
    } else {
        res.status(404).json({ message: "No receipt found for that id" });
    }
});