import { ParsedObject } from "./parsedObject";

export class ParserBase {
    Parse(name: string, words: string[]): [boolean, ParsedObject] {
        console.log(`Error !! ParserBase ${name}, ${words}`);
        return [false, new ParsedObject("", "none")];
    }
}
