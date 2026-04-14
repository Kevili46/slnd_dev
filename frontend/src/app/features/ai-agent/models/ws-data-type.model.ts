export const WS_DATA = {
    'AI_RESPONSE': 'AI_RESPONSE',
    'USER_QUERY': 'USER_QUERY',
    'STATUS': 'STATUS',
    'ERROR': 'ERROR',
} as const;

export type WsData = typeof WS_DATA[keyof typeof WS_DATA];