import { ClassParser } from "./classParser";
import { EnumParser } from "./enumParser";

export class Parser {
    #rawString = "";

    constructor(str: string) {
        this.#rawString = str;
        this.Parse();
    }

    SplitWards(): string[] {
        const lines = this.#rawString.split(/\r\n|\n/);
        // 1単語区切りにする
        const words: string[] = [];
        for (const line of lines) {
            if (line.match(/^\/\//)) {
                continue;
            }
            for (const word of line.trim().split(" ")) {
                if (word !== "") {
                    words.push(word);
                }
            }
        }
        return words;
    }

    Parse() {
        const words = this.SplitWards();
        for (let index = 0; index < words.length; index++) {
            if (words[index].search("class") !== -1) {
                // class定義のパーシング
                const [result, idx] = this.ParseClass(words, index);
                if (result) {
                    index = idx;
                } else {
                    return;
                }
            } else if (words[index].search("enum") !== -1) {
                // enum定義のパーシング
                const [result, idx] = this.ParseEnum(words, index);
                if (result) {
                    index = idx;
                } else {
                    return;
                }
            } else {
                console.log(
                    `Error!! syntax error. index:${index}, word:${words[index]}`,
                );
            }
        }
    }

    ReadBrackets(words: string[], start_index: number): [boolean, number] {
        // {
        if (words[start_index] !== "{") {
            console.log(`Error!! invalid start index. ${start_index}`);
            return [false, 0];
        }
        for (let index = start_index; index < words.length; index++) {
            if (words[index] === "}") {
                return [true, index];
            }
        }

        // }が見つからない
        return [false, 0];
    }

    ParseClass(words: string[], index: number): [boolean, number] {
        // クラス名を読む
        // {}を読む
        const className = words[++index];
        const [result, idx] = this.ReadBrackets(words, ++index);
        if (!result) {
            console.log(`Error!! failed to read brackets. ${words[index]}`);
            return [result, 0];
        }

        // パラメータはClassObject側で解釈、保持する
        const cp = new ClassParser();
        cp.Parse(className, words.slice(++index, idx));
        // TODO: オブジェクトの保持

        return [result, idx];
    }

    ParseEnum(words: string[], index: number): [boolean, number] {
        // enum名を読む
        // {}を読む
        const enumName = words[++index];
        const [result, idx] = this.ReadBrackets(words, ++index);
        if (!result) {
            console.log(`Error!! failed to read brackets. ${words[index]}`);
            return [result, 0];
        }

        // パラメータはEnumObject側で解釈、保持する
        const eo = new EnumParser();
        eo.Parse(enumName, words.slice(++index, idx));
        // TODO: オブジェクトの保持

        return [result, idx];
    }
}
