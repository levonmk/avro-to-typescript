import * as avro from "avsc";
import { Type } from "avsc";
import * as mem from "mem";
import { AvroRecord } from "./AvroRecord";

function cacheKeyForSchema(schema: any): string {
    return schema.namespace + schema.name;
}

const memoizedTypeForSchema = mem(
    (schema: any): Type => avro.Type.forSchema(schema),
    { cacheKey: cacheKeyForSchema },
);

export abstract class BaseAvroRecord implements AvroRecord {

    public static readonly subject: string = "";
    public static readonly schema = {};

    public static getTypeForSchema(schema: any): Type {
        return memoizedTypeForSchema(schema);
    }

    /*
    I don't understand how this works, or where it's used
    @Memoize((schema: any) => {
        return schema.namespace + schema.name;
    })
    public static createTypeResolver(baseType: Type, newType: Type): Type {
        return baseType.createResolver(newType) as Type;
    }
     */

    public abstract schema(): any;

    public abstract subject(): string;

}
