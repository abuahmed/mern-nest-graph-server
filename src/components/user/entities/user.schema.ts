import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { hash, compare, genSalt } from 'bcryptjs';
import { createHash, timingSafeEqual } from 'crypto';
import { EMAIL_VERIFICATION_TIMEOUT, CLIENT_ORIGIN, PASSWORD_RESET_TIMEOUT } from '../../../config';
import { hashedToken, signVerificationUrl } from '../../../utils/utils';

@ObjectType()
@Schema()
export class ReturnStatus {
  @Field(() => String)
  message: string;
}

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => String, { nullable: true })
  @Prop()
  name?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  password?: string;
  @Field(() => String)
  @Prop()
  salt: string;
  @Field(() => String)
  @Prop()
  isAdmin: boolean;
  @Field(() => String)
  @Prop()
  avatar: string;
  @Field(() => String)
  @Prop()
  bio: string;
  // roles: [
  //     {
  //         type: MongooseSchema.Types.ObjectId;
  //         ref: 'Role';
  //     },
  // ];
  @Field(() => Date)
  @Prop()
  verifiedAt: Date;
  @Field(() => String)
  @Prop()
  token: string;
  @Field(() => Date)
  @Prop()
  expiredAt: Date;

  matchesPassword: (password: string) => Promise<boolean>;
  verificationUrl: () => string;
  url: (plaintextToken: string) => string;
  isValid: (plaintextToken: string) => boolean;
}

@ObjectType()
@Schema()
export class ReturnUser extends User {
  @Field(() => String)
  token: string;
}

export type UserDocument = User & Document;

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function () {
  if (this.isModified('password')) {
    const salt = await genSalt(10);
    //this.password = await hash(this.password, salt)
    this.password = await hash(this.password, salt);
  }

  if (this.token && this.isModified('token')) {
    this.token = hashedToken(this.token as string);

    //if (!this.expiredAt) {
    this.expiredAt = new Date(new Date().getTime() + Number(String(PASSWORD_RESET_TIMEOUT)));
    //}
  }
});

UserSchema.methods.matchesPassword = function <UserDocument>(password: string) {
  return compare(password, this.password);
};

UserSchema.methods.verificationUrl = function <UserDocument>() {
  const token = createHash('sha1').update(this.email).digest('hex');
  const expires = Date.now() + Number(String(EMAIL_VERIFICATION_TIMEOUT));

  const url = `${CLIENT_ORIGIN}/email/verify/${this.id}/${token}/${expires}`;
  const signature = signVerificationUrl(url);

  return `${url}/${signature}`;
};

UserSchema.methods.url = function <UserDocument>(plaintextToken: string) {
  return `${CLIENT_ORIGIN}/reset/${this.id}/${plaintextToken}`;
};

UserSchema.methods.isValid = function <UserDocument>(plaintextToken: string) {
  const hash = hashedToken(plaintextToken);

  return (
    timingSafeEqual(Buffer.from(hash), Buffer.from(this.token as string)) &&
    (this.expiredAt as Date) > new Date()
  );
};

export { UserSchema };
