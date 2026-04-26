import { Message } from "@features/ai-agent/models/message.model";
import { Participant } from "@features/ai-agent/models/participant.model";

export interface Chat {
    participants: Participant[];
    history: Message[];
}