export const REFERENCE_VIEW = {
    "TILE_VIEW": "TILE_VIEW",
    "LIST_VIEW": "LIST_VIEW"
} as const;

export type ReferenceView = typeof REFERENCE_VIEW[keyof typeof REFERENCE_VIEW];