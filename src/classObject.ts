export class ClassMember {
    type = "";
    isVector = false;
    name = "";
    initValue = "";

    constructor(type: string, name: string, isVector = false, initValue = "") {
        this.type = type;
        this.name = name;
        this.isVector = isVector;
        this.initValue = initValue;
    }
}

export class ClassObject {
    // 最低でも3単語ないとクラスを構成できない
    static readonly MIN_CLASS_WORD_SIZE = 3;
    #className = "";
    #members: ClassMember[] = [];
    #packetTag = "";
    constructor(className: string) {
        this.#className = className;
    }

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
        return result && result.length > 0;
    }

    // vec<型> の文字列から型だけ取り出す
    private VectorTypeFromString(word: string) {
        const result = word.match(/vec<.*>/);
        if (result?.length) {
            return result[0].substring(4, result[0].length - 1);
        } else {
            console.log(`not vector type: ${word}`);
            return "";
        }
    }

    // クラスの型と変数名を解析
    private ParseParameters(words: string[]): boolean {
        // クラスパラメータは型名と値をセットで解釈するので、末尾は-1
        for (let index = 0; index < words.length - 1; ++index) {
            if (words[index] === "PacketTag") {
                // パケットのタグ指定
                this.#packetTag = words[index + 1];
            } else if (this.IsPrimitiveType(words[index + 1])) {
                // プリミティブ型の保持
                this.#members.push(
                    new ClassMember(words[index], words[index + 1]),
                );

                // 値まで読み込んだのでインデックスを進める
                index++;
            } else if (this.IsVectorType(words[index + 1])) {
                // ベクター型の保持
                this.#members.push(
                    new ClassMember(
                        words[index],
                        this.VectorTypeFromString(words[index + 1]),
                        true,
                    ),
                );
                // 値まで読み込んだのでインデックスを進める
                index++;
            } else {
                console.log(
                    `Error!! invalid class parameters. ${words[index]}, words:${words}`,
                );
                return false;
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

    DebugLog() {
        console.log(`className:${JSON.stringify(this.#className)}`);
        console.log(`packetTag:${JSON.stringify(this.#packetTag)}`);
        console.log(`members:${JSON.stringify(this.#members)}`);
    }
}
