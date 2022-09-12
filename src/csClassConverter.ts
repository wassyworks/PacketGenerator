import { ClassConverter } from "./classConverter";
import { ClassObject } from "./classObject";

export class CsharpClassConverter implements ClassConverter {
    public Receive(obj: ClassObject) {
        console.log(obj.GetName());
    }
}
