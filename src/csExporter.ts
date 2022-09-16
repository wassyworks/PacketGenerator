import * as fs from "fs";
import { CsharpClassConverter } from "./csClassConverter";
import { CsharpEnumConverter } from "./csEnumConverter";
import { ParsedObject } from "./parsedObject";

// C#用に.csファイルを出力する
export class CSharpExporter {
    static CSHARP_DIR = "packets/csharp";
    static ExportAll(objects: ParsedObject[]) {
        const classConverter = new CsharpClassConverter();
        const enumConverter = new CsharpEnumConverter();
        let classString = "";
        classString += "using System;\n";
        classString += "using System.Collections;\n";
        classString += "using System.Collections.Generic;\n";

        // ヘッダ部分

        for (const obj of objects) {
            console.log(`${obj.GetName()}`);
            switch (obj.GetType()) {
                case "class":
                    obj.AcceptConverter(classConverter);
                    break;
                case "enum":
                    obj.AcceptConverter(enumConverter);
                    break;
                default:
                    console.log(`Error !! unknown tag. ${obj.GetType()}`);
                    break;
            }
        }

        classString += classConverter.OutputAll();

        // .csファイルの出力
        try {
            if (!fs.existsSync(CSharpExporter.CSHARP_DIR)) {
                // C#ソース格納用のディレクトリを作成する
                fs.mkdirSync(CSharpExporter.CSHARP_DIR);
                console.log(`mkdir: ${CSharpExporter.CSHARP_DIR}`);
            }
            fs.writeFileSync(
                `${CSharpExporter.CSHARP_DIR}/Packet.cs`,
                classString,
            );
            fs.writeFileSync(
                `${CSharpExporter.CSHARP_DIR}/PacketEnum.cs`,
                enumConverter.OutputAll(),
            );
        } catch (e) {
            console.log(`file write exception. ${e}`);
        }
    }
}
