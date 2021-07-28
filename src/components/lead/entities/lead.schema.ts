import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Lead {
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
  message?: string;
}

export type LeadDocument = Lead & Document;

const LeadSchema = SchemaFactory.createForClass(Lead);

export { LeadSchema };
