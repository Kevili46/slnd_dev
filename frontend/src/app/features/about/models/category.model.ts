export const CATEGORY = {
    'CORE': 'Core Stack',
    'FRONTEND': 'Frontend',
    'BACKEND': 'Backend',
    'DB': 'Database',
    'LANGUAGE': 'Coding in',
    'TOOL': 'Tools',
} as const;

export type CategoryType = (typeof CATEGORY)[keyof typeof CATEGORY];