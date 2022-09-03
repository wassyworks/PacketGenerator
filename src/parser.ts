export class Parser {
    #rawString = "";

    constructor(str: string) {
        this.#rawString = str;
        this.Parse();
    }

    Parse() {
        const lines = this.#rawString.split(/\r\n|\n/);
        // 1単語区切りにする
        const words: string[] = [];
        for (const line of lines) {
            for (const word of line.trim().split(" ")) {
                if (word !== "") {
                    words.push(word);
                }
            }
        }

        // for debug
        for (let index = 0; index < words.length; index++) {
            if (words[index].search("class") !== -1) {
                const [result, idx] = this.ReadClass(words, index);
                if (result) {
                    index = idx;
                } else {
                    return;
                }
            } else if (words[index].search("enum") !== -1) {
                const [result, idx] = this.ReadEnum(words, index);
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

    ReadClass(words: string[], index: number): [boolean, number] {
        // クラス名を読む
        // {}を読む
        const classname = words[index + 1];
        console.log(`classname:${classname}`);
        const [result, idx] = this.ReadBrackets(words, index + 2);
        if (!result) {
            console.log(`Error!! failed to read brackets. ${words[index]}`);
        }
        return [result, idx];
    }

    ReadEnum(words: string[], index: number): [boolean, number] {
        // enum名を読む
        // {}を読む
        const enumname = words[index + 1];
        console.log(`enumname:${enumname}`);
        const [result, idx] = this.ReadBrackets(words, index + 2);
        if (!result) {
            console.log(`Error!! failed to read brackets. ${words[index]}`);
        }
        return [result, idx];
    }
}
