import { Injectable } from '@nestjs/common';
//import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    return this.userService.authUser({ email: username, password: pass });
    // // const user = await this.usersService.findOne(username);
    // // if (user && user.password === pass) {
    // //   const { password, ...result } = user;
    // //   return result;
    // // }
    // return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
