import { Schema as MongooseSchema } from 'mongoose';
export declare class ListUserInput {
    _id?: MongooseSchema.Types.ObjectId;
    name?: string;
    email?: string;
    password?: string;
}
export declare class CreateUserInput {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export declare class UpdateUserInput {
    _id: MongooseSchema.Types.ObjectId;
    name?: string;
    email?: string;
}
