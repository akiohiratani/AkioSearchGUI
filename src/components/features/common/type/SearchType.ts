import { Race } from "../../../../domain/models/Race";
export interface SearchType {
    type: "horceName" | "raceId" | "favorite "| "topicRace" | "Nothing";
    value: string | Race;
}