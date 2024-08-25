import { SummaryCard } from "./summary-card.type";
import { Room } from "../interface/room.interface";

export type DashContract = {
    summaryCard: SummaryCard,
    roomList: Room[]
}