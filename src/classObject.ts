import { ParsedObject } from "./parsedObject";

export class ClassMember {
    type = "";
    name = "";
    isVector = false;
    initValue = "";

    constructor(type: string, name: string, isVector = false, initValue = "") {
        this.type = type;
        this.name = name;
        this.isVector = isVector;
        this.initValue = initValue;
    }
}

export class ClassObject extends ParsedObject {
    #members: ClassMember[] = [];
    #packetTag = "";

    AddMember(member: ClassMember) {
        this.#members.push(member);
    }

    SetTag(tag: string) {
        this.#packetTag = tag;
    }

    public override DebugLog() {
        console.log(`className:${JSON.stringify(this.GetName(), null, "  ")}`);
        console.log(`packetTag:${JSON.stringify(this.#packetTag, null, "  ")}`);
        console.log(`members:${JSON.stringify(this.#members, null, "  ")}`);
    }
}
