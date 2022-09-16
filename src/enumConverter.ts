import { EnumObject } from "./enumObject";

export interface EnumConverter {
    Receive(obj: EnumObject): void;
}
