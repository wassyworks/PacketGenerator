import { ClassObject } from "./classObject";

export interface ClassConverter {
    Receive(obj: ClassObject): void;
}
