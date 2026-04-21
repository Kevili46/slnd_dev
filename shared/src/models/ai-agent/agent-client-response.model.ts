import { WsData } from "./ws-data-type.model.js";
import { WsStatus } from "./ws-status.model.js";

export interface AgentClientResponse {
    type: WsData,
    data: string | WsStatus,
    timestamp: Date,
}