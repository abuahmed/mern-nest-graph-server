import { Model } from 'mongoose';
import { Lead, LeadDocument } from './entities/lead.schema';
import { CreateLeadInput } from './dto/lead.dto';
import { ReturnStatus } from '../user/entities/user.schema';
export declare class LeadService {
    private LeadModel;
    constructor(LeadModel: Model<LeadDocument>);
    findAll(): Promise<Lead[]>;
    create(createLeadDto: CreateLeadInput): Promise<ReturnStatus>;
}
