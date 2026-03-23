import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import aiAgentRoutes from '@routes/ai-agent.routes';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/v1/ai-agent/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString()
    });
});

app.use('/api/v1/ai-agent', aiAgentRoutes);

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
});


export default app;