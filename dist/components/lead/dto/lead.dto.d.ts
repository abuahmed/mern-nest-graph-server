import { Schema as MongooseSchema } from 'mongoose';
export declare class ListLeadInput {
    _id?: MongooseSchema.Types.ObjectId;
    name?: string;
    email?: string;
    message?: string;
}
export declare class CreateLeadInput {
    name: string;
    email: string;
    message: string;
}
export declare class UpdateLeadInput {
    _id: MongooseSchema.Types.ObjectId;
    name?: string;
    email?: string;
}
