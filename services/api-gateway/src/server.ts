import 'dotenv/config';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import { Socket } from 'net';

const app = express();
const PORT = process.env.GATEWAY_PORT || 4600;
const HOST = process.env.HOST || 'localhost';
const ID_SERVICE_URL = process.env.ID_SERVICE_URL || 'http://localhost:3001';
const AI_AGENT_SERVICE_URL = process.env.AI_AGENT_SERVICE_URL || 'http://localhost:3002';

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));

app.use('/api/v1/id', createProxyMiddleware({
    target: ID_SERVICE_URL,
    changeOrigin: true,
}));

const aiAgentProxy = createProxyMiddleware({
    target: AI_AGENT_SERVICE_URL,
    changeOrigin: true,
    ws: true,
});
app.use('/api/v1/ai-agent', aiAgentProxy);

app.get('/api/health', (req, res) => res.json({ status: 'UP', timestamp: new Date().toISOString() }));

const server = app.listen(Number(PORT), HOST, () => {
    console.log('----------------------------------------------------');
    console.log(`🛣  SLND API Gateway started on http://localhost:${PORT}`);
    console.log('----------------------------------------------------');
});

server.on('upgrade', (req, socket, head) => {
    if (req.url?.startsWith('/api/v1/ai-agent')) {
        aiAgentProxy.upgrade(req, socket as Socket, head);
    }
});