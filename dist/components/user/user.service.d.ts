import { Model } from 'mongoose';
import { ReturnStatus, ReturnUser, User, UserDocument } from './entities/user.schema';
import { CreateUserInput, ListUserInput, UpdateUserInput } from './dto/user.dto';
export declare class UserService {
    private UserModel;
    constructor(UserModel: Model<UserDocument>);
    findAll(): Promise<User[]>;
    authUser(listUserInput: ListUserInput): Promise<ReturnUser>;
    getUserProfile(listUserInput: ListUserInput): Promise<User>;
    create(createUserDto: CreateUserInput): Promise<ReturnStatus>;
    update(updateUserDto: UpdateUserInput): Promise<User>;
    delete(id: string): Promise<User>;
    deleteAll(): Promise<number>;
}
