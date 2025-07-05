import { EnumObject, EnumParameter } from "./enumObject";
import { ParsedObject } from "./parsedObject";
import { ParserBase } from "./parserBase";

export class EnumParser extends ParserBase {
    // enum名と値を解析
    public override Parse(
        name: string,
        words: string[],
    ): [boolean, ParsedObject] {
        const eo = new EnumObject(name);

        if (words.length <= 0) {
            console.log(`Error!! invalid enum parameters. words:${words}`);
            return [false, eo];
        }

        let incrementValue = 0;
        for (let index = 0; index < words.length; ++index) {
            if (words[index + 1] === "=") {
                // 初期値あり
                if (isNaN(Number(words[index + 2]))) {
                    return [false, eo];
                }

                incrementValue = Number(words[index + 2]);
                eo.AddParameter(
                    new EnumParameter(words[index], incrementValue),
                );
                index += 2;
            } else {
                // 初期値なし
                eo.AddParameter(
                    new EnumParameter(words[index], incrementValue),
                );
            }
            incrementValue++;
        }

        return [true, eo];
    }
}
