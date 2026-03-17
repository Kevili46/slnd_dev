export const ICON = {
    "LOGO": "LOGO",
    "LIGHT": "LIGHT",
    "DARK": "DARK",
    "CLOSE": "CLOSE",
    "CHAT": "CHAT",
    "PLANE": "PLANE",
} as const;
export type Icon = typeof ICON[keyof typeof ICON];