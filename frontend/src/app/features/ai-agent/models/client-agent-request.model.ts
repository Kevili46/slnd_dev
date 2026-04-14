import { WsData } from "@features/ai-agent/models//ws-data-type.model";

export interface ClientAgentRequest {
    type: WsData,
    query: string;
}