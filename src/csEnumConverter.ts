import { EnumConverter } from "./enumConverter";
import { EnumObject } from "./enumObject";

export class CsharpEnumConverter implements EnumConverter {
    public Receive(obj: EnumObject) {
        console.log(`cs enum converter: ${obj.GetName()}`);
    }
}
