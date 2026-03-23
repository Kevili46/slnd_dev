export const ROLE = {
    USER: 'user',
    MODEL: 'model'
} as const;
export type Role = typeof ROLE[keyof typeof ROLE];