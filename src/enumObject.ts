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

    AddParameter(param: EnumParameter) {
        this.#parameters.push(param);
    }

    public override DebugLog() {
        console.log(`enumName:${JSON.stringify(this.GetName(), null, "  ")}`);
        console.log(
            `parameters:${JSON.stringify(this.#parameters, null, "  ")}`,
        );
    }
}
