import { ReturnStatus } from '../user/entities/user.schema';
import { CreateLeadInput } from './dto/lead.dto';
import { Lead } from './entities/lead.schema';
import { LeadService } from './lead.service';
export declare class LeadResolver {
    private readonly _leadService;
    constructor(_leadService: LeadService);
    Leads(): Promise<Lead[]>;
    addLead(input: CreateLeadInput): Promise<ReturnStatus>;
}
