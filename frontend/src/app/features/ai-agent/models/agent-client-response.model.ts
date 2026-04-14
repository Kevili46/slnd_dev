import { WsData } from "@features/ai-agent/models/ws-data-type.model";
import { WsStatus } from "./ws-status.model.js";

export interface AgentClientResponse {
    type: WsData,
    data: string | WsStatus,
    timestamp: Date,
}