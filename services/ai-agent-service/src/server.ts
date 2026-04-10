import 'dotenv/config';
import app from './app.js';
import * as http from 'http';
import { setupWebSocket } from '#websockets/ai-agent.ws';

const PORT: string | number = process.env.PORT || 3002;
const HOST: string = process.env.HOST || 'localhost';

const server: http.Server = http.createServer(app);

setupWebSocket(server);

server.listen(Number(PORT), HOST, () => {
    console.log('-------------------------------------------------------');
    console.log(`🤖 AI Agent Service started on http://localhost:${PORT}`);
    console.log('-------------------------------------------------------');
});


const shutdown = (): void => {
    server.close(() => {
        process.exit(0);
    });

    setTimeout(() => {
        process.exit(1);
    }, 5000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});