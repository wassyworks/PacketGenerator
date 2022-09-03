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
        for (const word of words) {
            console.log(word);
        }
    }

    ReadClass(words: string[], index: number): number {
        return index;
    }
}
