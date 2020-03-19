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

    public abstract schema(): any;

    public abstract subject(): string;

}
