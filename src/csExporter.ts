import { CsharpClassConverter } from "./csClassConverter";
import { CsharpEnumConverter } from "./csEnumConverter";
import { ParsedObject } from "./parsedObject";

// C#用に.csファイルを出力する
export class CSharpExporter {
    ExportAll(objects: ParsedObject[]) {
        const classConverter = new CsharpClassConverter();
        const enumConverter = new CsharpEnumConverter();
        for (const obj of objects) {
            console.log(`${obj.GetName()}`);
            switch (obj.GetTag()) {
                case "class":
                    obj.AcceptConverter(classConverter);
                    break;
                case "enum":
                    obj.AcceptConverter(enumConverter);
                    break;
                default:
                    console.log(`Error !! unknown tag. ${obj.GetTag()}`);
                    break;
            }
        }
    }
}
