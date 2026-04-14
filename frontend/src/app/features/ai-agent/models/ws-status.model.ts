export const WS_STATUS = {
    'OK': 'OK',
} as const;

export type WsStatus = typeof WS_STATUS[keyof typeof WS_STATUS];