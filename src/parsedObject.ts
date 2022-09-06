export class ParsedObject {
    #name = "";
    constructor(name: string) {
        this.#name = name;
    }
    GetName() {
        return this.#name;
    }
    DebugLog() {
        console.log("Error !! DebugLog()");
    }
}
