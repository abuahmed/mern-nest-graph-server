import { CreateUserInput, ListUserInput, UpdateUserInput } from './dto/user.dto';
import { ReturnStatus, ReturnUser, User } from './entities/user.schema';
import { UserService } from './user.service';
export declare class UserResolver {
    private readonly _userService;
    constructor(_userService: UserService);
    Users(): Promise<User[]>;
    getUserProfile(input: ListUserInput): Promise<User>;
    authUser(input: ListUserInput): Promise<ReturnUser>;
    register(input: CreateUserInput): Promise<ReturnStatus>;
    updateUser(input: UpdateUserInput): Promise<User>;
    deleteUser(id: string): Promise<User>;
    deleteAll(): Promise<number>;
}
