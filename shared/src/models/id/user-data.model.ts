import { Consent } from './consent.model'

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