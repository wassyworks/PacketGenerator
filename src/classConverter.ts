import { ClassObject } from "./classObject";

export interface ClassConverter {
    Receive(obj: ClassObject): void;

    GetIndent(depth: number, size: number): string;
}
