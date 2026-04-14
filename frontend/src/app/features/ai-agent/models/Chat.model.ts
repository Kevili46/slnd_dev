import { Message } from "./message.model";
import { Participant } from "./participant.model";

export interface Chat {
    participants: Participant[];
    history: Message[];
}