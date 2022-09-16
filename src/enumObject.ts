import { EnumConverter } from "./enumConverter";
import { ParsedObject } from "./parsedObject";

export class EnumParameter {
    name = "";
    value = 0;

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }
}

export class EnumObject extends ParsedObject {
    #parameters: EnumParameter[] = [];

    constructor(name: string) {
        super(name, "enum");
    }

    AddParameter(param: EnumParameter) {
        this.#parameters.push(param);
    }

    GetParameters(): EnumParameter[] {
        return this.#parameters;
    }

    public override DebugLog() {
        console.log(`enumName:${JSON.stringify(this.GetName(), null, "  ")}`);
        console.log(
            `parameters:${JSON.stringify(this.#parameters, null, "  ")}`,
        );
    }

    public override AcceptConverter(converer: EnumConverter): void {
        converer.Receive(this);
    }
}
