export class ClassMember {
    type = "";
    isVector = false;
    name = "";
    initValue = "";
}

export class ClassObject {
    // 最低でも3単語ないとクラスを構成できない
    static readonly MIN_CLASS_WORD_SIZE = 3;
    #className = "";
    #members: ClassMember[] = [];
    #packetTag = "";

    private IsPrimitiveType(word: string) {
        return (
            word === "i8" ||
            word === "i16" ||
            word === "i32" ||
            word === "i64" ||
            word === "u8" ||
            word === "u16" ||
            word === "u32" ||
            word === "u64" ||
            word === "f32" ||
            word === "f64" ||
            word === "string"
        );
    }

    private IsVectorType(word: string) {
        const result = word.match(/vec<.*>/);
        if (result?.length) {
            console.log(
                `vector: ${result[0].substring(4, result[0].length - 1)}`,
            );
            return true;
        } else {
            return false;
        }
    }

    // クラスの型と変数名を解析
    private ParseParameters(words: string[]): boolean {
        for (let index = 0; index < words.length - 1; ++index) {
            if (words[index] === "PacketTag") {
                this.#packetTag = words[++index];
            } else if (this.IsPrimitiveType(words[index])) {
                console.log(`primitive: ${words[++index]}`);
            } else if (this.IsVectorType(words[index])) {
                console.log(`vector:${words[++index]}`);
            } else {
                console.log(
                    `Error!! invalid class parameters. ${words[index]}, words:${words}`,
                );
            }
        }

        return true;
    }

    Parse(words: string[]): boolean {
        if (words.length < ClassObject.MIN_CLASS_WORD_SIZE) {
            console.log(
                `Error!! invalid class parameters. wordlength:${words}`,
            );
            return false;
        }

        // for debug
        // for (const word of words) {
        //     console.log(`c:${word}`);
        // }

        return this.ParseParameters(words);
    }
}
