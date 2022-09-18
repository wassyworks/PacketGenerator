import { ClassConverter } from "./classConverter";
import { ClassObject } from "./classObject";

export class CsharpClassConverter implements ClassConverter {
    static DEFAULT_INDENT_SIZE = 4;
    #classStrings: Map<string, string> = new Map<string, string>();
    #indentCaches: Map<number, string> = new Map<number, string>();

    public Receive(obj: ClassObject) {
        console.log(`cs class converter: ${obj.GetName()}`);
        const indentDepth = 1;

        // C#のプリミティブに変換
        let classBody = `\npublic class ${obj.GetName()} : IPacket\n`;
        classBody += "{\n";

        for (const mem of obj.GetMembers()) {
            if (mem.isVector) {
                classBody += `${this.GetIndent(
                    indentDepth,
                )}public List<${this.ToCSharpType(mem.type)}> ${
                    mem.name
                } = new List<${this.ToCSharpType(mem.type)}>();\n`;
            } else if (mem.type === "string") {
                classBody += `${this.GetIndent(indentDepth)}public ${
                    mem.type
                } ${mem.name} = "";\n`;
            } else {
                classBody += `${this.GetIndent(
                    indentDepth,
                )}public ${this.ToCSharpType(mem.type)} ${mem.name} = 0;\n`;
            }
        }

        // GetTag()生成
        classBody += `\n${this.GetIndent(
            indentDepth,
        )}public PacketTag GetTag()\n`;
        classBody += `${this.GetIndent(indentDepth)}{\n`;
        classBody += `${this.GetIndent(
            indentDepth + 1,
        )} return PacketTag.${obj.GetPacketTag()};\n`;
        classBody += `${this.GetIndent(indentDepth)}}\n`;

        // Serialize()生成
        classBody += `\n${this.GetIndent(
            indentDepth,
        )}public int Serialize(ref byte[] byteArray, int offset)\n`;
        classBody += `${this.GetIndent(indentDepth)}{\n`;
        for (const mem of obj.GetMembers()) {
            classBody += `${this.GetIndent(
                indentDepth + 1,
            )}offset = SerializeUtil.ToBytes(ref byteArray, offset, ${
                mem.name
            });\n`;
        }
        classBody += `${this.GetIndent(indentDepth + 1)}return offset;\n`;
        classBody += `${this.GetIndent(indentDepth)}}\n`;

        // Deserialize()生成
        // TODO: 呼び出す関数名の判断
        classBody += `\n${this.GetIndent(
            indentDepth,
        )}public int Deserialize(byte[] byteArray, int offset)\n`;
        classBody += `${this.GetIndent(indentDepth)}{\n`;
        for (const mem of obj.GetMembers()) {
            classBody += `${this.GetIndent(indentDepth + 1)}(${
                mem.name
            }, offset) = DeserializeUtil.${this.ToCSharpConvertString(
                mem.type,
                mem.isVector,
            )}(byteArray, offset);\n`;
        }
        classBody += `${this.GetIndent(indentDepth + 1)}return offset;\n`;
        classBody += `${this.GetIndent(indentDepth)}}\n`;

        classBody += "}\n";

        this.#classStrings.set(obj.GetName(), classBody);
        console.log(`class converted. ${obj.GetName()}`);
    }

    public OutputAll(): string {
        let ret = "";
        for (const classBody of this.#classStrings.values()) {
            ret += classBody;
        }
        return ret;
    }

    GetIndent(
        depth: number,
        size = CsharpClassConverter.DEFAULT_INDENT_SIZE,
    ): string {
        return new Array(depth * size).fill(" ").join("");
    }

    // C#のプリミティブに変換する
    ToCSharpType(type: string): string {
        switch (type) {
            case "u64":
                return "ulong";
            case "i64":
                return "long";
            case "u32":
                return "uint";
            case "i32":
                return "int";
            case "u16":
                return "ushort";
            case "i16":
                return "short";
            case "i8":
                return "sbyte";
            case "u8":
                return "byte";
            case "f32":
                return "float";
            case "f64":
                return "double";
            default:
                return type;
        }
    }

    // デシリアライズ用の変換メソッド
    ToCSharpConvertString(type: string, isVec: boolean) {
        const vec = isVec ? "Vec" : "";
        switch (type) {
            case "u64":
                return `To${vec}U64`;
            case "i64":
                return `To${vec}I64`;
            case "u32":
                return `To${vec}U32`;
            case "i32":
                return `To${vec}I32`;
            case "u16":
                return `To${vec}U16`;
            case "i16":
                return `To${vec}I16`;
            case "i8":
                return `To${vec}I8`;
            case "u8":
                return `To${vec}U8`;
            case "f32":
                return `To${vec}Float`;
            case "string":
                return `To${vec}String`;
            default:
                return `To${vec}Class`;
        }
    }
}
