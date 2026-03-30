import { Message } from "./Message.model";
import { Participant } from "./Participant.model";

export interface Chat {
    participants: Participant[];
    history: Message[];
}