import { Message } from "./Message.model";
import { Participant } from "./Participant.model";

export interface Chat {
    id: number;
    participants: Participant[];
    history: Message[];
}