import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReturnStatus } from '../user/entities/user.schema';
import { CreateLeadInput } from './dto/lead.dto';
import { Lead } from './entities/lead.schema';
import { LeadService } from './lead.service';

@Resolver()
export class LeadResolver {
  constructor(private readonly _leadService: LeadService) {}

  //Query
  @Query(() => [Lead])
  async Leads() {
    return this._leadService.findAll();
  }

  @Mutation(() => ReturnStatus)
  async addLead(@Args('input') input: CreateLeadInput) {
    return this._leadService.create(input);
  }

  //   @Query(() => Lead)
  //   async getLeadProfile(@Args('input') input: ListLeadInput) {
  //     return this._leadService.getLeadProfile(input);
  //   }
  //Mutations
  //   @Mutation(() => ReturnLead)
  //   async authLead(@Args('input') input: ListLeadInput) {
  //     return this._leadService.authLead(input);
  //   }

  //   @Mutation(() => Lead)
  //   async updateLead(@Args('input') input: UpdateLeadInput) {
  //     return this._leadService.update(input);
  //   }

  //   @Mutation(() => Lead)
  //   async deleteLead(@Args('id') id: string) {
  //     return this._leadService.delete(id);
  //   }

  //   @Mutation(() => Number)
  //   async deleteAll() {
  //     return this._leadService.deleteAll();
  //   }
}
