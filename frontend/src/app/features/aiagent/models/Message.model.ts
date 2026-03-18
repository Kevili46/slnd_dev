import { Participant } from "./participant.model";

export interface Message {
    text: string,
    author: Participant,
    date: Date,
}