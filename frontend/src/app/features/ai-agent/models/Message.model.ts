import { Participant } from "@features/ai-agent/models/participant.model";

export interface Message {
    text: string,
    author: Participant,
    date: Date,
}