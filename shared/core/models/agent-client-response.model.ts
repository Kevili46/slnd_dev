import { WsData } from "./ws-data-type.model";
import { WsStatus } from "./ws-status.model";

export interface AgentClientResponse {
    type: WsData,
    data: string | WsStatus,
    timestamp: Date,
}