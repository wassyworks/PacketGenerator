import { ClassConverter } from "./classConverter";
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

    constructor(name: string) {
        super(name, "class");
    }
    AddMember(member: ClassMember) {
        this.#members.push(member);
    }

    GetMembers(): ClassMember[] {
        return this.#members;
    }

    GetPacketTag(): string {
        return this.#packetTag;
    }
    SetTag(tag: string) {
        this.#packetTag = tag;
    }

    public override DebugLog() {
        console.log(`className:${JSON.stringify(this.GetName(), null, "  ")}`);
        console.log(`packetTag:${JSON.stringify(this.#packetTag, null, "  ")}`);
        console.log(`members:${JSON.stringify(this.#members, null, "  ")}`);
    }

    public override AcceptConverter(converer: ClassConverter): void {
        converer.Receive(this);
    }
}
