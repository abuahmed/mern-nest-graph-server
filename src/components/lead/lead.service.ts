import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Lead, LeadDocument } from './entities/lead.schema';
import { CreateLeadInput } from './dto/lead.dto';
import { ReturnStatus } from '../user/entities/user.schema';

@Injectable()
export class LeadService {
  constructor(@InjectModel(Lead.name) private LeadModel: Model<LeadDocument>) {}

  async findAll(): Promise<Lead[]> {
    return this.LeadModel.find().exec();
  }

  async create(createLeadDto: CreateLeadInput): Promise<ReturnStatus> {
    const { email, name, message } = createLeadDto;

    const lead = await this.LeadModel.create({
      email,
      name,
      message,
    });

    if (lead) {
      const status = new ReturnStatus();
      status.message = `Successfully Registered`;
      return status;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid lead data',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    //return lead;
    //return createdLead.save();
  }
}
