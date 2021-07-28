import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnStatus, ReturnUser, User, UserDocument } from './entities/user.schema';
import { CreateUserInput, ListUserInput, UpdateUserInput } from './dto/user.dto';
import { validate, registerSchema, loginSchema } from '../../validation';
import generateToken from 'src/utils/jwt';
import { sendMail } from 'src/utils/mail';
import { APP_HOSTNAME } from 'src/config';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.UserModel.find().exec();
  }

  async authUser(listUserInput: ListUserInput): Promise<ReturnUser> {
    await validate(loginSchema, listUserInput);

    const { email, password } = listUserInput;

    const user = await this.UserModel.findOne({ email });

    if (!user || !(await user.matchesPassword(password))) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Incorrect email or password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userData = new ReturnUser();
    userData._id = user._id;
    userData.name = user.name;
    userData.email = user.email;
    userData.isAdmin = user.isAdmin;
    userData.token = generateToken(user._id);
    return userData;
  }

  async getUserProfile(listUserInput: ListUserInput): Promise<User> {
    const { _id } = listUserInput;
    const user = await this.UserModel.findById({ _id });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Incorrect email or password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  async create(createUserDto: CreateUserInput): Promise<ReturnStatus> {
    const { email, name, password } = createUserDto;

    await validate(registerSchema, createUserDto);
    const found = await this.UserModel.exists({ email });

    if (found) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
      //throw new BadRequest('User already exists')
    }
    const user = await this.UserModel.create({
      email,
      name,
      password,
    });

    if (user) {
      const link = user.verificationUrl();
      await sendMail({
        to: email,
        subject: 'Verify your email address',
        html: `
                <h1>Please use the following link to activate your account</h1>
                <p>${link}</p>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>${APP_HOSTNAME}</p>
            `,
      });

      const status = new ReturnStatus();
      status.message = `Email has been sent to ${email}. Follow the instruction to activate your account`;
      return status;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user data',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    //return user;
    //return createdUser.save();
  }
  async update(updateUserDto: UpdateUserInput): Promise<User> {
    return this.UserModel.findByIdAndUpdate(updateUserDto._id, updateUserDto);
  }
  async delete(id: string): Promise<User> {
    return this.UserModel.findByIdAndDelete(id);
  }

  async deleteAll(): Promise<number> {
    return (await this.UserModel.deleteMany()).deletedCount;
  }
}
