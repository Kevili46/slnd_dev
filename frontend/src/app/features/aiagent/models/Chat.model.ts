import { Message } from "./Message.model";
import { Participant } from "./participant.model";

export interface Chat {
    id: number;
    participants: Participant[];
    history: Message[];
}