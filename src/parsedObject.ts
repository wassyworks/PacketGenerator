import { ClassConverter } from "./classConverter";
import { EnumConverter } from "./enumConverter";

type ParsedObjectType = "none" | "class" | "enum";

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
    DebugLog() {
        console.log("Error !! Call DebugLog Directly");
    }

    AcceptClassConverter(converer: ClassConverter) {
        console.log(`Error !! Call AcceptClassConverter Directly ${converer}`);
    }
    AcceptEnumConverter(converer: EnumConverter) {
        console.log(`Error !! Call AcceptEnumConverter Directly ${converer}`);
    }
}
