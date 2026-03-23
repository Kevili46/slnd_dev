import 'dotenv/config';
import app from './src/app';
import * as http from 'http';

const PORT: string | number = process.env.PORT || 3000;

const server: http.Server = http.createServer(app);

server.listen(PORT, () => {
    console.log('----------------------------------------------------');
    console.log(`🚀 AI Agent Service started on http://localhost:${PORT}`);
    console.log(`📡 Status: Ready for Nginx reverse-proxy traffic (TS)`);
    console.log('----------------------------------------------------');
});

const shutdown = (): void => {
    server.close(() => {
        process.exit(0);
    });

    setTimeout(() => {
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});