import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, ListUserInput, UpdateUserInput } from './dto/user.dto';
import { ReturnStatus, ReturnUser, User } from './entities/user.schema';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly _userService: UserService) {}

  //Query
  @Query(() => [User])
  async Users() {
    return this._userService.findAll();
  }

  @Query(() => User)
  async getUserProfile(@Args('input') input: ListUserInput) {
    return this._userService.getUserProfile(input);
  }
  //Mutations
  @Mutation(() => ReturnUser)
  async authUser(@Args('input') input: ListUserInput) {
    return this._userService.authUser(input);
  }
  @Mutation(() => ReturnStatus)
  async register(@Args('input') input: CreateUserInput) {
    return this._userService.create(input);
  }
  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput) {
    return this._userService.update(input);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string) {
    return this._userService.delete(id);
  }

  @Mutation(() => Number)
  async deleteAll() {
    return this._userService.deleteAll();
  }
}
