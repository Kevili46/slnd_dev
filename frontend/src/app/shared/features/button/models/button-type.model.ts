export const BUTTON = {
    'DEFAULT': 'DEFAULT',
    'RAISED': 'RAISED',
    'CTA': 'CTA'
}

export type ButtonType = (typeof BUTTON)[keyof typeof BUTTON];