import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Lead, LeadSchema } from './entities/lead.schema';
import { LeadResolver } from './lead.resolver';
import { LeadService } from './lead.service';

@Module({
  imports: [ConfigModule, MongooseModule.forFeature([{ name: Lead.name, schema: LeadSchema }])],
  providers: [LeadResolver, LeadService],
})
export class LeadModule {}
