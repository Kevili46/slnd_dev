export const ICON = {
    "LOGO": "LOGO",
    "LIGHT": "LIGHT",
    "DARK": "DARK",
    "CLOSE": "CLOSE",
    "CHAT": "CHAT",
    "PLANE": "PLANE",
    "MAIL": "MAIL",
    "TILE_VIEW": "TILE_VIEW",
    "LIST_VIEW": "LIST_VIEW"
} as const;
export type Icon = typeof ICON[keyof typeof ICON];