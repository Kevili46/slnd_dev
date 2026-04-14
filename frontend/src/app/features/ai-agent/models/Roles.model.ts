export const ROLE = {
    'SYSTEM': 'SYSTEM',
    'USER': 'USER'
} as const;

export type Role = typeof ROLE[keyof typeof ROLE];