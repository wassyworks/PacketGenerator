import { ParsedObject } from "./parsedObject";

// C#用に.csファイルを出力する
export class CSharpExporter {
    ExportAll(objects: ParsedObject[]) {
        for (const obj of objects) {
            console.log(`${obj.GetName()}`);
        }
    }
}
