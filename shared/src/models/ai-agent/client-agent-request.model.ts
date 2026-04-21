import { WsData } from "./ws-data-type.model";

export interface ClientAgentRequest {
    type: WsData,
    query: string;
}