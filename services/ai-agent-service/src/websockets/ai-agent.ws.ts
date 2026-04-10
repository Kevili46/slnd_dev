import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { createChatSession, sendMessage } from '#services/ai-agent-service';
import { AgentClientResponse, ClientAgentRequest, WS_DATA, WS_STATUS } from '@slnd/shared';
import { ChatSession } from '@google/generative-ai';

export const setupWebSocket = (server: any) => {
    const wss = new WebSocketServer({ noServer: true });

    server.on('upgrade', (request: IncomingMessage, socket: any, head: Buffer) => {
        if (request.url?.startsWith('/api/v1/ai-agent')) {
            wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit('connection', ws, request);
            });
        } else {
            socket.destroy();
        }
    });

    wss.on('connection', (ws: WebSocket) => {
        console.log('Client connected to AI Agent WS');
        const userChatSession: ChatSession = createChatSession();

        (ws as any).isAlive = true;
        ws.on('pong', () => { (ws as any).isAlive = true; });

        ws.on('message', async (data: string) => {
            try {
                const parsed: ClientAgentRequest = JSON.parse(data.toString());

                if (parsed.type === WS_DATA.USER_QUERY) {
                    const queryReceived: AgentClientResponse = {
                        type: WS_DATA.STATUS,
                        data: WS_STATUS.OK,
                        timestamp: new Date(),
                    }
                    ws.send(JSON.stringify(queryReceived));

                    const responseText = await sendMessage(userChatSession, parsed.query);

                    const response: AgentClientResponse = {
                        type: WS_DATA.AI_RESPONSE,
                        data: responseText,
                        timestamp: new Date(),
                    }
                    ws.send(JSON.stringify(response));
                }
            } catch (error) {
                console.error('WS Processing Error:', error);
                ws.send(JSON.stringify({ type: WS_DATA.ERROR, message: 'Failed to process prompt' }));
            }
        });

        ws.on('close', () => {
            console.log('Client disconnected to AI Agent WS');
        });
    });

    const interval = setInterval(() => {
        wss.clients.forEach((ws: WebSocket) => {
            if ((ws as any).isAlive === false) return ws.terminate();
            (ws as any).isAlive = false;
            ws.ping();
        });
    }, 30000);

    wss.on('close', () => {
        clearInterval(interval)
    });
};