import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import idServiceRoutes from '#routes/id-service.routes';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString()
    });
});

app.use('', idServiceRoutes);

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
});


export default app;