import { EnumConverter } from "./enumConverter";
import { EnumObject } from "./enumObject";

export class CsharpEnumConverter implements EnumConverter {
    static DEFAULT_INDENT_SIZE = 4;
    #enumStrings: Map<string, string> = new Map<string, string>();
    public Receive(obj: EnumObject) {
        console.log(`cs enum converter: ${obj.GetName()}`);
        const indentDepth = 1;
        let enumBody = `\npublic enum ${obj.GetName()}\n`;
        enumBody += "{\n";

        for (const mem of obj.GetParameters()) {
            enumBody += `${this.GetIndent(indentDepth)}${mem.name} = ${
                mem.value
            },\n`;
        }
        enumBody += "}\n";

        this.#enumStrings.set(obj.GetName(), enumBody);
        console.log(`enum converted. ${obj.GetName()}`);
    }

    public OutputAll(): string {
        let ret = "";
        for (const enumBody of this.#enumStrings.values()) {
            ret += enumBody;
        }
        return ret;
    }

    GetIndent(
        depth: number,
        size = CsharpEnumConverter.DEFAULT_INDENT_SIZE,
    ): string {
        return new Array(depth * size).fill(" ").join("");
    }
}
