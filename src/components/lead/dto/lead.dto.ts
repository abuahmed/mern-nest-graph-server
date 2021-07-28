import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Lead } from '../entities/lead.schema';

@InputType()
export class ListLeadInput {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  message?: string;
}

@InputType()
export class CreateLeadInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  message: string;
}

@InputType()
export class UpdateLeadInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;
}
