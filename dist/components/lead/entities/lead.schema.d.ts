import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class Lead {
    _id: MongooseSchema.Types.ObjectId;
    email: string;
    name?: string;
    message?: string;
}
export declare type LeadDocument = Lead & Document;
declare const LeadSchema: MongooseSchema<Document<Lead, any>, import("mongoose").Model<any, any, any>, undefined>;
export { LeadSchema };
