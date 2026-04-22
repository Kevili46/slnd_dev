import { Consent } from './consent.model.js'
import { REFERENCE_VIEW, ReferenceView } from './reference-view.model.js'

export interface UserData {
    userId: string,
    options: {
        consent: Consent,
        theme: string,
        lang: string,
        referenceView: ReferenceView,
    }
    createdAt: Date,
    updatedAt: Date | null,
}

export interface UserDataRow {
    user_id: string,
    options: any,
    created_at: Date,
    updated_at: Date,
}

export const defaultOptions: UserData['options'] = {
    consent: {
        obtained: false,
        functional: false,
        analytics: false
    },
    theme: 'LIGHT',
    lang: 'en',
    referenceView: REFERENCE_VIEW.TILE_VIEW,
}