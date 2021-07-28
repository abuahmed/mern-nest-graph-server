/// <reference types="hapi__joi" />
import { Root, StringSchema, ObjectSchema } from '@hapi/joi';
interface ExtendedRoot extends Root {
    objectId(): StringSchema;
}
export declare const Joi: ExtendedRoot;
export declare const validate: (schema: ObjectSchema, payload: any) => Promise<void>;
export {};
