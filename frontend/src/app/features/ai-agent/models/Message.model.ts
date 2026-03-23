import { Participant } from "./Participant.model";

export interface Message {
    text: string,
    author: Participant,
    date: Date,
}