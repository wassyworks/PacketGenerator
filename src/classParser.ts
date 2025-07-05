import { ClassMember, ClassObject } from "./classObject";
import { ParsedObject } from "./parsedObject";
import { ParserBase } from "./parserBase";

export class ClassParser extends ParserBase {
    // 最低でも3単語ないとクラスを構成できない
    static readonly MIN_CLASS_WORD_SIZE = 3;

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

    private IsVectorType(word: string) {
        const result = word.match(/vec<.*>/);
        return result && result.length > 0;
    }

    // クラスの型と変数名を解析
    public override Parse(
        name: string,
        words: string[],
    ): [boolean, ParsedObject] {
        const co = new ClassObject(name);

        if (words.length < ClassParser.MIN_CLASS_WORD_SIZE) {
            console.log(
                `Error!! invalid class parameters. wordlength:${words}`,
            );
            return [false, co];
        }

        for (let idx = 0; idx < words.length - 1; ++idx) {
            if (words[idx] === "PacketTag") {
                // パケットのタグ指定
                co.SetTag(words[idx + 1]);
            } else if (this.IsPrimitiveType(words[idx])) {
                // プリミティブ型の保持
                co.AddMember(new ClassMember(words[idx], words[idx + 1]));
            } else if (this.IsVectorType(words[idx])) {
                // ベクター型の保持
                co.AddMember(
                    new ClassMember(
                        this.VectorTypeFromString(words[idx]),
                        words[idx + 1],
                        true,
                    ),
                );
            } else {
                console.log(
                    `Error!! invalid class parameters. ${words[idx]}, words:${words}`,
                );
                return [false, co];
            }

            // 値まで読み込んだのでインデックスを進める
            idx++;
        }

        return [true, co];
    }
}
