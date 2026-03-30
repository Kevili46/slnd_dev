export const BUTTON = {
    'GHOST': 'GHOST',
    'RAISED': 'RAISED',
    'CTA': 'CTA'
}

export type ButtonType = (typeof BUTTON)[keyof typeof BUTTON];