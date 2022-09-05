export class EnumParameters {
    name = "";
    value = 0;

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }
}

export class EnumObject {
    #enumName = "";
    #parameters: EnumParameters[] = [];
    constructor(enumName: string) {
        this.#enumName = enumName;
    }

    // enum名と値を解析
    private ParseParameters(words: string[]): boolean {
        let incrementValue = 0;
        for (let index = 0; index < words.length; ++index) {
            if (words[index + 1] === "=") {
                // 初期値あり
                if (isNaN(Number(words[index + 2]))) {
                    return false;
                }

                incrementValue = Number(words[index + 2]);
                this.#parameters.push(
                    new EnumParameters(words[index], incrementValue),
                );
                index += 2;
            } else {
                // 初期値なし
                this.#parameters.push(
                    new EnumParameters(words[index], incrementValue),
                );
            }
            incrementValue++;
        }

        return true;
    }

    Parse(words: string[]): boolean {
        if (words.length <= 0) {
            console.log(`Error!! invalid enum parameters. words:${words}`);
            return false;
        }

        return this.ParseParameters(words);
    }

    DebugLog() {
        console.log(`enumName:${JSON.stringify(this.#enumName, null, "  ")}`);
        console.log(
            `parameters:${JSON.stringify(this.#parameters, null, "  ")}`,
        );
    }
}
