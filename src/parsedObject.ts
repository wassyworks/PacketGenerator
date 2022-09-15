import { ClassConverter } from "./classConverter";
import { EnumConverter } from "./enumConverter";

type ParsedObjectType = "none" | "class" | "enum";

type ConverterType = ClassConverter | EnumConverter;

export class ParsedObject {
    #type: ParsedObjectType = "none";
    #name = "";
    constructor(name: string, type: ParsedObjectType) {
        this.#name = name;
        this.#type = type;
    }
    GetName() {
        return this.#name;
    }
    GetType() {
        return this.#type;
    }
    DebugLog() {
        console.log("Error !! Call DebugLog Directly");
    }

    AcceptConverter(converter: ConverterType) {
        console.log(`Error !! Call AcceptClassConverter Directly ${converter}`);
    }
}
