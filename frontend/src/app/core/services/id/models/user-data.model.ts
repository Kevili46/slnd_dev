import { Consent } from '@core/services/id/models/consent.model'

export interface UserData {
    userId: string,
    data: {
        consent: Consent,
        theme: string,
        lang: string,
        projectsView: string,
    }
    createdAt: Date,
}