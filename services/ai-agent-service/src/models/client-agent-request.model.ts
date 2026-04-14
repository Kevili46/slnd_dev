import { WsData } from "./ws-data-type.model.js";

export interface ClientAgentRequest {
    type: WsData,
    query: string;
}