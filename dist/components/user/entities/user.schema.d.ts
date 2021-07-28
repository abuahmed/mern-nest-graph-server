import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class ReturnStatus {
    message: string;
}
export declare class User {
    _id: MongooseSchema.Types.ObjectId;
    email: string;
    name?: string;
    password?: string;
    salt: string;
    isAdmin: boolean;
    avatar: string;
    bio: string;
    verifiedAt: Date;
    token: string;
    expiredAt: Date;
    matchesPassword: (password: string) => Promise<boolean>;
    verificationUrl: () => string;
    url: (plaintextToken: string) => string;
    isValid: (plaintextToken: string) => boolean;
}
export declare class ReturnUser extends User {
    token: string;
}
export declare type UserDocument = User & Document;
declare const UserSchema: MongooseSchema<Document<User, any>, import("mongoose").Model<any, any, any>, undefined>;
export { UserSchema };
